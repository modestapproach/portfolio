// ai-openrouter.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// The one model client behind the local AI service: an OpenAI-compatible
// chat call against OpenRouter, plus the translation between the studio's
// Gemini-shaped agent protocol (`contents` of `parts`, `functionCall` /
// `functionResponse`) and OpenAI tool calling. Server-side only — the key
// never reaches the browser.

export const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export function apiKey(): string {
  return process.env.OPENROUTER_API_KEY ?? '';
}
export function defaultModel(): string {
  return process.env.OPENROUTER_MODEL || 'z-ai/glm-5.3-flash';
}

export interface ToolCall { id: string; name: string; args: Record<string, unknown> }
export interface ORMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: Array<{ id: string; type: 'function'; function: { name: string; arguments: string } }>;
  tool_call_id?: string;
  name?: string;
}
export interface ORTool { type: 'function'; function: { name: string; description?: string; parameters?: unknown } }
export interface Usage { inputTokens: number; outputTokens: number }

export interface ChatOptions {
  messages: ORMessage[];
  model?: string;
  tools?: ORTool[];
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
}
export interface ChatResult { text: string; toolCalls: ToolCall[]; usage: Usage; model: string }

function headers(): Record<string, string> {
  return {
    'content-type': 'application/json',
    authorization: `Bearer ${apiKey()}`,
    'http-referer': 'https://editor.teddessert.com',
    'x-title': 'Revyme studio (self-hosted)',
  };
}

function usageOf(u: any): Usage {
  return { inputTokens: Number(u?.prompt_tokens ?? 0), outputTokens: Number(u?.completion_tokens ?? 0) };
}

async function failure(res: Response): Promise<Error> {
  const body = await res.text().catch(() => '');
  let msg = body.slice(0, 300);
  try { msg = JSON.parse(body)?.error?.message ?? msg; } catch { /* keep raw */ }
  return new Error(`OpenRouter ${res.status}: ${msg}`);
}

/** One non-streaming completion. */
export async function chat(opts: ChatOptions): Promise<ChatResult> {
  if (!apiKey()) throw new Error('OPENROUTER_API_KEY is not set on the studio server (.env.studio).');
  const model = opts.model || defaultModel();
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: headers(),
    signal: opts.signal,
    body: JSON.stringify({
      model,
      messages: opts.messages,
      tools: opts.tools?.length ? opts.tools : undefined,
      temperature: opts.temperature ?? 0.2,
      max_tokens: opts.maxTokens ?? 16000,
    }),
  });
  if (!res.ok) throw await failure(res);
  const data: any = await res.json();
  const choice = data.choices?.[0]?.message ?? {};
  const toolCalls: ToolCall[] = (choice.tool_calls ?? []).map((c: any, i: number) => {
    let args: Record<string, unknown> = {};
    try { args = c.function?.arguments ? JSON.parse(c.function.arguments) : {}; } catch { args = {}; }
    return { id: c.id || `call_${i}`, name: c.function?.name ?? '', args };
  });
  return { text: typeof choice.content === 'string' ? choice.content : '', toolCalls, usage: usageOf(data.usage), model: data.model ?? model };
}

/** Streaming completion; `onDelta` gets each text fragment as it arrives. */
export async function chatStream(opts: ChatOptions, onDelta: (text: string) => void): Promise<{ text: string; usage: Usage; model: string }> {
  if (!apiKey()) throw new Error('OPENROUTER_API_KEY is not set on the studio server (.env.studio).');
  const model = opts.model || defaultModel();
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: headers(),
    signal: opts.signal,
    body: JSON.stringify({
      model,
      messages: opts.messages,
      temperature: opts.temperature ?? 0.2,
      max_tokens: opts.maxTokens ?? 16000,
      stream: true,
      stream_options: { include_usage: true },
    }),
  });
  if (!res.ok || !res.body) throw await failure(res);
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let text = '';
  let usage: Usage = { inputTokens: 0, outputTokens: 0 };
  let seenModel = model;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const payload = line.slice(6).trim();
      if (payload === '[DONE]') continue;
      let evt: any;
      try { evt = JSON.parse(payload); } catch { continue; }
      if (evt.model) seenModel = evt.model;
      if (evt.usage) usage = usageOf(evt.usage);
      const delta = evt.choices?.[0]?.delta?.content;
      if (typeof delta === 'string' && delta) { text += delta; onDelta(delta); }
    }
  }
  return { text, usage, model: seenModel };
}

// ─── Gemini-shaped agent protocol ⇄ OpenAI ──────────────────────────────────

export interface GeminiPart { text?: string; functionCall?: { name: string; args?: Record<string, unknown> }; functionResponse?: { name: string; response: unknown } }
export interface GeminiContent { role: 'user' | 'model'; parts: GeminiPart[] }
export interface GeminiTool { name: string; description: string; parameters: unknown }

/** Replay a `contents` history as OpenAI messages. The studio's history has
 *  no tool-call ids, so they are minted here per model turn and the next
 *  user turn's functionResponses are matched to them by position (falling
 *  back to name). */
export function geminiToMessages(system: string, contents: GeminiContent[]): ORMessage[] {
  const out: ORMessage[] = [{ role: 'system', content: system }];
  let lastCalls: Array<{ id: string; name: string }> = [];
  contents.forEach((c, turn) => {
    if (c.role === 'model') {
      const text = c.parts.filter((p) => p.text).map((p) => p.text).join('');
      const calls = c.parts.filter((p) => p.functionCall);
      lastCalls = calls.map((p, i) => ({ id: `call_${turn}_${i}`, name: p.functionCall!.name }));
      out.push({
        role: 'assistant',
        content: text || null,
        tool_calls: calls.length
          ? calls.map((p, i) => ({ id: lastCalls[i].id, type: 'function', function: { name: p.functionCall!.name, arguments: JSON.stringify(p.functionCall!.args ?? {}) } }))
          : undefined,
      });
      return;
    }
    const responses = c.parts.filter((p) => p.functionResponse);
    if (responses.length) {
      responses.forEach((p, i) => {
        const match = lastCalls[i]?.name === p.functionResponse!.name ? lastCalls[i] : lastCalls.find((x) => x.name === p.functionResponse!.name) ?? lastCalls[i];
        out.push({ role: 'tool', tool_call_id: match?.id ?? `call_${turn}_${i}`, name: p.functionResponse!.name, content: JSON.stringify(p.functionResponse!.response ?? {}) });
      });
    }
    const text = c.parts.filter((p) => p.text).map((p) => p.text).join('\n');
    if (text) out.push({ role: 'user', content: text });
  });
  return out;
}

export function geminiToolsToOpenAI(tools: GeminiTool[]): ORTool[] {
  return tools.map((t) => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }));
}

export function resultToParts(r: ChatResult): GeminiPart[] {
  const parts: GeminiPart[] = [];
  if (r.text) parts.push({ text: r.text });
  for (const c of r.toolCalls) parts.push({ functionCall: { name: c.name, args: c.args } });
  return parts;
}
