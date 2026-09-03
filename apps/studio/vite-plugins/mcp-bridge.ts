// mcp-bridge.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// The server side of the editor's MCP bridge, so an MCP client (Claude Code,
// Cursor, claude.ai) can drive the RUNNING editor: read the project as the
// tab sees it and submit oracle-gated writes that land on the canvas live.
//
// Two legs, both served under /__revyme_ai on the editor's own origin:
//
//   editor tab  ⇄  this server        (src/ai/mcp/bridge-client.ts)
//     GET  /bridge/events   SSE; each frame `data: {"id","method","params"}`
//     POST /bridge/result   `{id, result}` or `{id, error}`
//   MCP client  ⇄  this server        (Streamable HTTP, bearer = access token)
//     POST|GET|DELETE /mcp/:projectId
//
// A tool call becomes a bridge request to the most recently connected tab
// for that project ('local' in disk mode), which runs it in the browser —
// the bridge client owns the 12 methods, the stale-read tracking and the
// oracle bounce contract ({committed:false, violations, instruction}) that
// the model is expected to self-correct against.

import type { IncomingMessage, ServerResponse } from 'node:http';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

// ─── Bridge (SSE to the tabs) ────────────────────────────────────────────────

interface Pending { resolve: (v: unknown) => void; reject: (e: Error) => void; timer: NodeJS.Timeout }

const tabs = new Map<string, ServerResponse[]>(); // projectId → open SSE responses, newest last
const pending = new Map<number, Pending>();
let nextId = 1;

export function openBridge(projectId: string, req: IncomingMessage, res: ServerResponse): void {
  res.writeHead(200, {
    'content-type': 'text/event-stream; charset=utf-8',
    'cache-control': 'no-cache, no-transform',
    connection: 'keep-alive',
    'x-accel-buffering': 'no',
  });
  res.write('retry: 3000\n\n');
  const list = tabs.get(projectId) ?? [];
  list.push(res);
  tabs.set(projectId, list);
  const ping = setInterval(() => { try { res.write(': ping\n\n'); } catch { /* closing */ } }, 25_000);
  const drop = () => {
    clearInterval(ping);
    const cur = tabs.get(projectId) ?? [];
    const i = cur.indexOf(res);
    if (i >= 0) cur.splice(i, 1);
    if (cur.length === 0) tabs.delete(projectId); else tabs.set(projectId, cur);
  };
  req.on('close', drop);
  res.on('close', drop);
  // eslint-disable-next-line no-console
  console.log(`[mcp-bridge] tab connected for "${projectId}" (${list.length} open)`);
}

export function resolveBridge(body: { id?: number; result?: unknown; error?: string }): boolean {
  const p = typeof body?.id === 'number' ? pending.get(body.id) : undefined;
  if (!p) return false;
  pending.delete(body.id!);
  clearTimeout(p.timer);
  if (body.error !== undefined) p.reject(new Error(String(body.error)));
  else p.resolve(body.result);
  return true;
}

export function bridgeConnected(projectId: string): boolean {
  return (tabs.get(projectId)?.length ?? 0) > 0;
}

export function callBridge(projectId: string, method: string, params: unknown, timeoutMs = 90_000): Promise<unknown> {
  const list = tabs.get(projectId) ?? [];
  const res = list[list.length - 1];
  if (!res) {
    return Promise.reject(new Error(`No editor tab is connected for project "${projectId}". Open the studio in a browser first.`));
  }
  const id = nextId++;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`The editor did not answer "${method}" within ${Math.round(timeoutMs / 1000)}s.`));
    }, timeoutMs);
    pending.set(id, { resolve, reject, timer });
    try {
      res.write(`data: ${JSON.stringify({ id, method, params: params ?? {} })}\n\n`);
    } catch (err) {
      pending.delete(id);
      clearTimeout(timer);
      reject(err instanceof Error ? err : new Error(String(err)));
    }
  });
}

// ─── MCP server (Streamable HTTP) ────────────────────────────────────────────

const text = (v: unknown) => ({ content: [{ type: 'text' as const, text: typeof v === 'string' ? v : JSON.stringify(v, null, 2) }] });
const failed = (e: unknown) => ({ isError: true, content: [{ type: 'text' as const, text: e instanceof Error ? e.message : String(e) }] });

function buildServer(projectId: string): McpServer {
  const server = new McpServer({ name: 'revyme-studio', version: '0.1.0' });
  const call = (method: string, params?: unknown) => callBridge(projectId, method, params);
  const run = async (fn: () => Promise<unknown>) => { try { return text(await fn()); } catch (e) { return failed(e); } };

  server.tool(
    'revyme_get_context',
    'Call FIRST. The active file in the editor (path, kind, full source), the page and component lists, design tokens, CMS collections and locales. Reading a file here also marks it as read for revyme_submit_files.',
    {},
    async () => run(() => call('getContext')),
  );
  server.tool('revyme_list_files', 'All project file paths.', {}, async () => run(() => call('listFiles')));
  server.tool(
    'revyme_read_file',
    'Read one project file (e.g. app/page.client.tsx, components/Card.tsx). Always read before writing: the editor rejects writes to files it has not seen you read since their last change.',
    { path: z.string() },
    async ({ path }) => run(() => call('readFile', { path })),
  );
  server.tool(
    'revyme_submit_files',
    'Submit COMPLETE file contents to the live editor. kind is "page" for app/**/page.client.tsx or a LayoutClient.tsx, "component" for components/<PascalCase>.tsx. The editor runs its checks and either commits ({committed:true, written}) or bounces ({committed:false, violations, instruction}) — fix every violation and resubmit the whole file. Keep data-id / data-name attributes; the canvas is keyed on them.',
    { files: z.array(z.object({ path: z.string(), kind: z.enum(['page', 'component']), code: z.string() })).min(1) },
    async ({ files }) => run(() => call('submitFiles', { files })),
  );
  server.tool(
    'revyme_edit_file',
    'Replace one exact snippet in a file with new text (old_string must occur exactly once), then submit the file through the same checks as revyme_submit_files. Read the file first.',
    { path: z.string(), old_string: z.string(), new_string: z.string() },
    async ({ path, old_string, new_string }) => run(async () => {
      const cur = (await call('readFile', { path })) as { code?: string };
      const code = cur?.code ?? '';
      const first = code.indexOf(old_string);
      if (first < 0) throw new Error('old_string was not found in the file — re-read it and copy the text exactly.');
      if (code.indexOf(old_string, first + 1) >= 0) throw new Error('old_string occurs more than once — include more surrounding context so it is unique.');
      const next = code.slice(0, first) + new_string + code.slice(first + old_string.length);
      const kind = path.startsWith('components/') ? 'component' : 'page';
      return call('submitFiles', { files: [{ path, kind, code: next }] });
    }),
  );
  server.tool(
    'revyme_manage_presets',
    'Design tokens in app/globals.css. action: list | set (tokens: [{name,value,category?}]) | remove (names) | set_typography (name, values).',
    { action: z.enum(['list', 'set', 'remove', 'set_typography']), tokens: z.array(z.record(z.string(), z.unknown())).optional(), names: z.array(z.string()).optional(), name: z.string().optional(), tag: z.string().optional(), values: z.record(z.string(), z.unknown()).optional() },
    async (p) => run(() => call('managePresets', p)),
  );
  server.tool(
    'revyme_manage_cms',
    'CMS collections and items. action: list_collections | get_collection | create_collection | rename_collection | delete_collection | add_field | update_field | remove_field | add_item | update_item | remove_item | set_item_translation | create_pages | create_page | create_template. args carries the action parameters; an {error} in the result is the editor asking for a correction, not a crash.',
    { action: z.string(), args: z.record(z.string(), z.unknown()).optional() },
    async ({ action, args }) => run(() => call('manageCms', { action, args: args ?? {} })),
  );
  server.tool(
    'revyme_manage_translations',
    'Locales and translated texts. op: get | set_locales (locales: string[]) | write_texts (locale, items: [{filePath,nodeId,text}]).',
    { op: z.enum(['get', 'set_locales', 'write_texts']), locales: z.array(z.string()).optional(), locale: z.string().optional(), items: z.array(z.record(z.string(), z.unknown())).optional() },
    async (p) => run(() => call('manageTranslations', p)),
  );
  server.tool(
    'revyme_upload_asset',
    'Upload an image (base64) into the project; returns its /assets URL.',
    { dataBase64: z.string(), contentType: z.string().optional(), filename: z.string().optional() },
    async (p) => run(() => call('uploadImage', p)),
  );
  server.tool(
    'revyme_create_icon_set',
    'Create an icon set from SVG sources. icons: [{label?, text: "<svg…>"}].',
    { name: z.string(), icons: z.array(z.object({ label: z.string().optional(), text: z.string() })).min(1) },
    async (p) => run(() => call('createIconSet', p)),
  );
  return server;
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c: Buffer) => { data += c; if (data.length > 16 * 1024 * 1024) req.destroy(); });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : undefined); } catch { resolve(undefined); } });
    req.on('error', () => resolve(undefined));
  });
}

/** Stateless Streamable HTTP: a fresh server + transport per request. */
export async function handleMcp(projectId: string, req: IncomingMessage, res: ServerResponse): Promise<void> {
  const server = buildServer(projectId);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on('close', () => { void transport.close(); void server.close(); });
  await server.connect(transport);
  const body = req.method === 'POST' ? await readJson(req) : undefined;
  await transport.handleRequest(req, res, body);
}
