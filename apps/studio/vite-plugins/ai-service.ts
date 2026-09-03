// ai-service.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// The studio's AI features all talk to one "ai-generator" service that
// upstream hosts and this fork does not have. This plugin is a local
// stand-in, mounted at /__revyme_ai on the editor's own origin (so it works
// on localhost, over the tailnet and through the tunnel, behind the access
// gate, with no CORS), backed by OpenRouter (ai-openrouter.ts). Contracts
// are those of the studio's clients in src/ai/**:
//
//   GET  /api/freeform/models            model picker catalogue
//   POST /api/freeform/job               page/component chat: returns {jobId};
//   GET  /api/freeform/job/:id           the client polls until settled
//   POST /api/page-agent/turn            page agent AND CMS agent: one model
//                                        call per turn, tools run in the tab
//   POST /api/component-chat/stream      whole-file rewrites, SSE with
//   POST /api/icon-set-chat/stream       CUMULATIVE `code` events then one
//   POST /api/plugin-chat/stream         `done` (or one `error`)
//   POST /api/translate/estimate         {credits}
//   POST /api/translate                  {success, translations}
//   GET  /bridge/events, POST /bridge/result, * /mcp/:projectId  (mcp-bridge.ts)
//
// Errors are `{error}` with a non-2xx status — every client reads that.

import type { Plugin, Connect } from 'vite';
import type { ServerResponse } from 'node:http';
import { chat, chatStream, defaultModel, geminiToMessages, geminiToolsToOpenAI, resultToParts, type GeminiContent, type GeminiTool } from './ai-openrouter';
import { openBridge, resolveBridge, handleMcp } from './mcp-bridge';

const PREFIX = '/__revyme_ai';

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}
function readBody(req: Connect.IncomingMessage, limit = 32 * 1024 * 1024): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c: Buffer) => { data += c; if (data.length > limit) { resolve(''); req.destroy(); } });
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}
async function json<T = any>(req: Connect.IncomingMessage): Promise<T> {
  const raw = await readBody(req);
  return (raw ? JSON.parse(raw) : {}) as T;
}
const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

// ─── Models ──────────────────────────────────────────────────────────────────

function models() {
  const def = defaultModel();
  const list = [
    { id: 'openai/gpt-5.6-terra', label: 'GPT-5.6 Terra', vendor: 'openai', tier: 'standard' },
    { id: 'openai/gpt-5.6-terra-pro', label: 'GPT-5.6 Terra Pro', vendor: 'openai', tier: 'best' },
    { id: 'z-ai/glm-5.3-flash', label: 'GLM 5.3 Flash', vendor: 'zai', tier: 'fast' },
    { id: 'z-ai/glm-5.3', label: 'GLM 5.3', vendor: 'zai', tier: 'standard' },
  ];
  if (!list.some((m) => m.id === def)) list.unshift({ id: def, label: def, vendor: def.split('/')[0] || 'other', tier: 'standard' });
  return { models: list, defaultModel: def };
}

// ─── Shared project rules ────────────────────────────────────────────────────

const PROJECT_RULES = `The project is a Next.js (App Router) + React + TypeScript site edited in Revyme, a visual builder.
- Pages live at app/**/page.client.tsx ('use client'); components at components/<PascalCase>.tsx.
- Elements carry data-id and data-name attributes; the canvas is keyed on them. Keep every existing data-id; give new elements a new unique data-id (kebab-case) and a short data-name.
- Styling is inline style objects (camelCase CSS). Responsive overrides live in a <style> block with @media rules keyed to the artboard widths already present — do not invent new breakpoints.
- Code components declare /** @label */, /** @comment */ and /** @controls {...} */ JSDoc pragmas and export default withResponsiveProps(Component).
- Never touch app/layout.tsx, lib/, icons/, plugins/, styles/, cms/, i18n/, _meta/ or app/globals.css unless the task is about them.
- Output complete files, never fragments or diffs.`;

// ─── Freeform jobs (page / component chat) ───────────────────────────────────

interface Job { status: 'running' | 'done'; result?: unknown; createdAt: number }
const jobs = new Map<string, Job>();
let jobSeq = 0;
setInterval(() => {
  const cutoff = Date.now() - 30 * 60_000;
  for (const [id, j] of jobs) if (j.createdAt < cutoff) jobs.delete(id);
}, 60_000).unref();

function parseFreeform(raw: string, currentPath: string, kind: string): { files: Array<{ path: string; kind: string; code: string }>; text: string } {
  const files: Array<{ path: string; kind: string; code: string }> = [];
  const re = /=== FILE: (.+?) \| (page|component) ===\r?\n([\s\S]*?)\r?\n=== END FILE ===/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) files.push({ path: m[1].trim(), kind: m[2], code: stripFence(m[3]) });
  let text = '';
  const t = raw.match(/=== TEXT ===\r?\n([\s\S]*)$/);
  if (t) text = t[1].trim();
  if (files.length === 0) {
    // Fallback: a single fenced block is the current file.
    const fence = raw.match(/```(?:tsx|ts|jsx|js)?\r?\n([\s\S]*?)```/);
    if (fence) {
      files.push({ path: currentPath, kind, code: fence[1] });
      text = text || raw.replace(fence[0], '').trim().slice(0, 400);
    }
  }
  return { files, text: text || 'Done.' };
}
function stripFence(code: string): string {
  const m = code.match(/^```[a-z]*\r?\n([\s\S]*?)\r?\n```\s*$/);
  return m ? m[1] : code;
}

async function runFreeform(body: any): Promise<unknown> {
  const t0 = Date.now();
  const currentPath = String(body.currentPath ?? 'app/page.client.tsx');
  const kind = body.kind === 'component' ? 'component' : 'page';
  const system = `You are the coding agent inside Revyme. ${PROJECT_RULES}

OUTPUT FORMAT (strict — the editor parses it):
For every file you change or create, write:
=== FILE: <path> | <page|component> ===
<the complete file>
=== END FILE ===
After the last file write:
=== TEXT ===
<one or two sentences on what you changed>
The file you are editing is ${currentPath} (${kind}). Reference other files by their real path. No commentary outside the sections.`;
  const messages: any[] = [{ role: 'system', content: system }];
  for (const h of (body.history ?? []) as Array<{ role: string; content: string }>) {
    if (h?.content) messages.push({ role: h.role === 'assistant' ? 'assistant' : 'user', content: String(h.content).slice(0, 20000) });
  }
  let user = `CURRENT FILE (${currentPath}):\n\`\`\`tsx\n${String(body.currentCode ?? '')}\n\`\`\`\n\nREQUEST: ${String(body.prompt ?? '')}`;
  if (body.previousAttempt && Array.isArray(body.violations) && body.violations.length) {
    user += `\n\nYOUR PREVIOUS ATTEMPT WAS REJECTED by the editor's checks:\n${body.violations.map((v: any) => `- [${v.code}] ${v.message}`).join('\n')}\n\nPrevious attempt:\n${String(body.previousAttempt).slice(0, 60000)}\n\nFix every listed problem and output the complete corrected file(s).`;
  }
  messages.push({ role: 'user', content: user });
  const r = await chat({ messages, model: body.model || undefined, maxTokens: 32000 });
  const parsed = parseFreeform(r.text, currentPath, kind);
  if (parsed.files.length === 0) {
    return { success: false, error: 'The model did not return a file. Try rephrasing the request.' };
  }
  return {
    success: true,
    files: parsed.files,
    text: parsed.text,
    usage: { inputTokens: r.usage.inputTokens, outputTokens: r.usage.outputTokens, durationMs: Date.now() - t0, model: r.model },
  };
}

// ─── Page / CMS agent turns ──────────────────────────────────────────────────

function agentSystem(body: any): string {
  if (typeof body.cmsCollection === 'string') {
    return `You are the CMS agent inside Revyme, a visual website builder. You manage content collections (schemas, fields, items, translations) ONLY through the provided tools — never describe changes without making them. ${body.cmsCollection ? `The user is working in the collection "${body.cmsCollection}"; do not create other collections.` : 'The user is at the CMS root.'} Read before you write: inspect a collection before changing it. When a tool returns {error}, correct the call and try again. When the work is done, reply with a short plain-text summary and no further tool calls.`;
  }
  const sel = Array.isArray(body.selectedNodeIds) && body.selectedNodeIds.length ? `Selected node ids: ${body.selectedNodeIds.join(', ')}.` : 'Nothing is selected.';
  return `You are the page agent inside Revyme, a visual website builder. You change the page ONLY through the provided tools (read the tree and styles first, then mutate). ${PROJECT_RULES}
Active file: ${body.activeFilePath ?? 'app/page.client.tsx'}. Active viewport: ${body.activeViewportId ?? 'desktop'}. ${sel}
Prefer small, targeted tool calls over rewriting files. When a tool returns {error}, correct the call and try again. When the request is fulfilled, answer with a short plain-text summary and no further tool calls.`;
}

async function agentTurn(body: any): Promise<unknown> {
  const contents = (body.contents ?? []) as GeminiContent[];
  const tools = (body.tools ?? []) as GeminiTool[];
  const messages = geminiToMessages(agentSystem(body), contents);
  const r = await chat({ messages, tools: geminiToolsToOpenAI(tools), model: body.model || undefined, maxTokens: 8000 });
  return { success: true, parts: resultToParts(r), usage: { inputTokens: r.usage.inputTokens, outputTokens: r.usage.outputTokens, model: r.model } };
}

// ─── Whole-file streaming chats ──────────────────────────────────────────────

const SURFACE_HINT: Record<string, string> = {
  component: 'a React code component file (components/<Name>.tsx) with its @label / @comment / @controls pragmas',
  'icon-set': 'an icon-set file: a TSX module exporting SVG icons',
  plugin: 'a studio plugin file (plugins/<name>.tsx)',
};

async function streamRewrite(surface: string, req: Connect.IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await json(req);
  const t0 = Date.now();
  res.writeHead(200, { 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-cache, no-transform', 'x-accel-buffering': 'no' });
  const send = (evt: unknown) => { try { res.write(`data: ${JSON.stringify(evt)}\n`); } catch { /* client gone */ } };
  const system = `You are editing ${SURFACE_HINT[surface] ?? 'a source file'} inside Revyme. ${PROJECT_RULES}
Reply with the COMPLETE updated file in ONE fenced code block (\`\`\`tsx … \`\`\`), then one sentence describing the change after the block. Nothing else.`;
  const messages: any[] = [{ role: 'system', content: system }];
  for (const h of (body.conversationHistory ?? []) as Array<{ role: string; content: string }>) {
    if (h?.content) messages.push({ role: h.role === 'assistant' ? 'assistant' : 'user', content: String(h.content).slice(0, 20000) });
  }
  messages.push({ role: 'user', content: `CURRENT FILE:\n\`\`\`tsx\n${String(body.code ?? '')}\n\`\`\`\n\nREQUEST: ${String(body.prompt ?? '')}` });

  // Cumulative `code` events: everything after the opening fence, until the
  // closing fence, throttled to ~8/s.
  let acc = '';
  let lastSent = 0;
  const codeSoFar = () => {
    const open = acc.match(/```[a-z]*\r?\n/);
    if (!open || open.index === undefined) return null;
    const start = open.index + open[0].length;
    const close = acc.indexOf('\n```', start);
    return close >= 0 ? acc.slice(start, close) : acc.slice(start);
  };
  try {
    const r = await chatStream({ messages, maxTokens: 32000 }, (delta) => {
      acc += delta;
      const now = Date.now();
      if (now - lastSent > 120) {
        const c = codeSoFar();
        if (c !== null) { send({ type: 'code', code: c }); lastSent = now; }
      }
    });
    const final = codeSoFar();
    if (final === null) {
      send({ type: 'error', error: 'The model did not return a code block.' });
    } else {
      send({ type: 'code', code: final });
      const after = acc.slice(acc.indexOf('\n```', acc.indexOf(final)) + 4).replace(/^`*\s*/, '').trim();
      const before = acc.slice(0, acc.search(/```[a-z]*\r?\n/)).trim();
      send({ type: 'done', text: (after || before || 'Updated.').slice(0, 600), usage: { inputTokens: r.usage.inputTokens, outputTokens: r.usage.outputTokens, model: r.model, durationMs: Date.now() - t0 } });
    }
  } catch (e) {
    send({ type: 'error', error: errMsg(e) });
  }
  res.end();
}

// ─── Translation ─────────────────────────────────────────────────────────────

async function translate(body: any): Promise<unknown> {
  const items = (body.items ?? []) as Array<{ key: string; text: string }>;
  if (items.length === 0) return { success: true, translations: {} };
  const out: Record<string, string> = {};
  for (let i = 0; i < items.length; i += 60) {
    const batch = items.slice(i, i + 60);
    const r = await chat({
      model: body.model || undefined,
      messages: [
        { role: 'system', content: `Translate website copy from ${body.sourceLocale ?? 'the source language'} to ${body.targetLocale ?? 'the target language'}. Keep meaning, tone, length and any placeholders/markup. Reply with ONLY a JSON object mapping each key to its translation.` },
        { role: 'user', content: JSON.stringify(Object.fromEntries(batch.map((it) => [it.key, it.text]))) },
      ],
      maxTokens: 16000,
    });
    const m = r.text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('The model did not return JSON.');
    Object.assign(out, JSON.parse(m[0]));
  }
  return { success: true, translations: out };
}

// ─── Plugin ──────────────────────────────────────────────────────────────────

export function aiService(): Plugin {
  return {
    name: 'revyme-ai-service',
    configureServer(server) { mount(server); },
    configurePreviewServer(server) { mount(server); },
  };

  function mount(server: { middlewares: Connect.Server }) {
    server.middlewares.use((req, res, next) => {
      const raw = req.url ?? '/';
      if (!raw.startsWith(PREFIX + '/')) return next();
      const url = new URL(raw.slice(PREFIX.length), 'http://local');
      const p = url.pathname;
      const m = req.method ?? 'GET';
      const run = (fn: () => Promise<unknown>) =>
        fn().then((body) => { if (!res.headersSent) sendJson(res, 200, body); })
          .catch((e) => { if (!res.headersSent) sendJson(res, 500, { error: errMsg(e) }); else res.end(); });

      // MCP bridge + server
      if (p === '/bridge/events' && m === 'GET') { openBridge(url.searchParams.get('websiteId') || 'local', req, res); return; }
      if (p === '/bridge/result' && m === 'POST') {
        return void json(req).then((b) => { const ok = resolveBridge(b); sendJson(res, ok ? 200 : 404, { ok }); }).catch(() => sendJson(res, 400, { error: 'bad json' }));
      }
      const mcp = p.match(/^\/mcp\/([^/]+)$/);
      if (mcp) { handleMcp(decodeURIComponent(mcp[1]), req, res).catch((e) => { if (!res.headersSent) sendJson(res, 500, { error: errMsg(e) }); }); return; }

      if (p === '/api/freeform/models' && m === 'GET') return sendJson(res, 200, models());

      if (p === '/api/freeform/job' && m === 'POST') {
        return void json(req).then((body) => {
          const id = `job-${++jobSeq}-${Date.now().toString(36)}`;
          const job: Job = { status: 'running', createdAt: Date.now() };
          jobs.set(id, job);
          sendJson(res, 200, { jobId: id });
          runFreeform(body)
            .then((result) => { job.status = 'done'; job.result = result; })
            .catch((e) => { job.status = 'done'; job.result = { status: 'error', error: errMsg(e) }; });
        }).catch(() => sendJson(res, 400, { error: 'bad json' }));
      }
      const jobM = p.match(/^\/api\/freeform\/job\/([^/]+)$/);
      if (jobM && m === 'GET') {
        const job = jobs.get(jobM[1]);
        if (!job) return sendJson(res, 404, { error: 'Unknown or expired job.' });
        return sendJson(res, 200, job.status === 'running' ? { status: 'running' } : job.result);
      }

      if (p === '/api/page-agent/turn' && m === 'POST') return void run(() => json(req).then(agentTurn));
      if (p === '/api/design-spec/turn' && m === 'POST') return sendJson(res, 501, { error: 'The design-spec route is not available in this build.' });

      const stream = p.match(/^\/api\/(component|icon-set|plugin)-chat\/stream$/);
      if (stream && m === 'POST') { streamRewrite(stream[1], req, res).catch((e) => { if (!res.headersSent) sendJson(res, 500, { error: errMsg(e) }); else res.end(); }); return; }

      if (p === '/api/translate/estimate' && m === 'POST') return void json(req).then((b) => sendJson(res, 200, { credits: Array.isArray(b.items) ? b.items.length : 0, success: true })).catch(() => sendJson(res, 400, { error: 'bad json' }));
      if (p === '/api/translate' && m === 'POST') return void run(() => json(req).then(translate));

      sendJson(res, 404, { error: `No such AI route: ${m} ${p}` });
    });
    // eslint-disable-next-line no-console
    console.log(`[ai-service] ready at ${PREFIX} (model ${defaultModel()}${process.env.OPENROUTER_API_KEY ? '' : ' — OPENROUTER_API_KEY missing'})`);
  }
}
