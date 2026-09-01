// access-gate.ts — LOCAL FORK ADDITION (not upstream Revyme).
//
// A single-secret gate for the studio when it is exposed on a public
// hostname (Cloudflare Tunnel). Cloudflare Access is the better answer when
// available — identity at the edge, zero auth code here — but activating it
// requires accepting Zero Trust terms and a billing authorization. This is
// the bounded alternative: ONE shared secret, over TLS, for ONE user.
//
// What it is NOT: a user system. No accounts, no roles, no reset flow. If
// this ever needs to be multi-user, delete this file and use Access.
//
// Activation: set REVYME_ACCESS_TOKEN. Unset (normal localhost dev) the
// plugin is inert — every request passes through untouched.
//
// Flow:
//   1. request without a valid cookie          → 401 + a minimal sign-in page
//   2. POST the token (or ?access_token=…)     → sets an HttpOnly cookie
//   3. subsequent requests carry the cookie    → pass through
//
// The cookie is HttpOnly + SameSite=Lax + Secure, scoped to the tunnel
// hostname. Comparison is timing-safe. Failures are logged with the source
// IP so a brute-force attempt is visible in the terminal.

import type { Plugin, Connect } from 'vite';
import crypto from 'node:crypto';
import type { ServerResponse } from 'node:http';

const COOKIE = 'revyme_access';
/** Set alongside COOKIE by every grant. Its absence on a top-level document
 *  request means this browser never completed a full unlock chain (legacy
 *  session, token rotation, cleared sibling cookies) — the gate then re-runs
 *  the chain automatically instead of letting iframes strand at 401. */
const CHAINED = 'revyme_chain_ok';
const UNLOCK_PATH = '/__revyme_unlock';

/** All public hostnames (this server's own + its siblings). One unlock on any
 *  of them chains 302s through the rest so each plants its cookie — the user
 *  types the token exactly once. Cookies are per-host, and the hostnames
 *  can't share a Domain= cookie without a second-level subdomain (which
 *  Universal SSL doesn't cover), so a redirect chain is the clean fix. */
const PUBLIC_HOSTS = (process.env.REVYME_PUBLIC_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

/** Hostnames reachable only over the tailnet (Tailscale hostname/IP). The
 *  WireGuard layer IS the auth there — every packet already proves a device
 *  enrolled in the tailnet — so the token gate would only add a cookie that
 *  plain-http hosts can't even store (the cookie is Secure). Treated exactly
 *  like loopback. */
const TAILNET_HOSTS = new Set(
  (process.env.REVYME_TAILNET_HOSTS ?? '')
    .split(',')
    .map((h) => h.trim().replace(/:\d+$/, ''))
    .filter(Boolean),
);

/** Open-redirect guard: chain destinations may only point at our own hosts. */
function safeDest(dest: string | null): string | null {
  if (!dest) return null;
  try {
    const u = new URL(dest);
    return u.protocol === 'https:' && PUBLIC_HOSTS.includes(u.host) ? u.href : null;
  } catch {
    return null;
  }
}

/** Constant-time compare that also tolerates length mismatch. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Still burn a comparison so length isn't leaked by timing.
    crypto.timingSafeEqual(ab, ab);
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

function readCookie(header: string | undefined, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

/** Derived cookie value — the raw token never travels back to the browser. */
function cookieValueFor(token: string): string {
  return crypto.createHash('sha256').update(`revyme-access:${token}`).digest('hex');
}

const SIGN_IN_PAGE = `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Studio access</title>
<style>
  body { margin:0; min-height:100vh; display:grid; place-items:center;
         background:#0a0a0b; color:#ededf0;
         font:15px/1.5 ui-sans-serif, system-ui, -apple-system, sans-serif; }
  form { display:flex; flex-direction:column; gap:14px; width:min(88vw,340px); }
  h1 { margin:0; font-size:17px; font-weight:600; letter-spacing:-0.01em; }
  p { margin:0; color:#8b8b96; font-size:13px; }
  input { padding:11px 13px; border-radius:9px; border:1px solid #2a2a30;
          background:#131315; color:inherit; font:inherit; }
  input:focus { outline:2px solid #ff5c33; outline-offset:1px; border-color:transparent; }
  button { padding:11px 13px; border-radius:9px; border:0; background:#ff5c33;
           color:#fff; font:inherit; font-weight:600; cursor:pointer; }
</style>
<form method="POST">
  <h1>Studio access</h1>
  <p>This editor writes to your site and can publish. Enter the access token.</p>
  <input type="password" name="token" autocomplete="current-password" autofocus
         placeholder="Access token" aria-label="Access token">
  <button type="submit">Unlock</button>
</form>`;

const FRAMED_PAGE = `<!doctype html>
<meta charset="utf-8">
<title>Studio access</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0a0b;color:#8b8b96;font:14px/1.6 ui-sans-serif,system-ui,sans-serif;text-align:center}b{color:#ededf0}</style>
<div><b>Studio session needs a refresh.</b><br>Reload the editor tab (⌘R) — it will unlock this panel automatically.</div>`;

function deny(res: ServerResponse, status = 401, framed = false): void {
  res.statusCode = status;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  // Inside an iframe the editor's canvas overlay eats pointer events, so a
  // form would render but never be clickable — show instructions instead.
  res.end(framed ? FRAMED_PAGE : SIGN_IN_PAGE);
}

function readBody(req: Connect.IncomingMessage, limit = 8 * 1024): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c: Buffer) => {
      data += c;
      if (data.length > limit) {
        resolve('');
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}

export function accessGate(): Plugin {
  const token = process.env.REVYME_ACCESS_TOKEN ?? '';
  return {
    name: 'revyme-access-gate',
    // `pre` so the gate runs before the disk API and before Vite serves any
    // module — an unauthenticated request must not reach project source.
    configureServer(server) { mountGate(server); },
    configurePreviewServer(server) { mountGate(server); },
  };

  function mountGate(server: { middlewares: import('vite').Connect.Server }) {
      if (!token) return; // inert on localhost
      const expected = cookieValueFor(token);

      server.middlewares.use((req, res, next) => {
        const host = String(req.headers.host ?? '');
        // Loopback is trusted (it's the developer's own machine, and the
        // tunnel connects to us over loopback only after Cloudflare has
        // already routed a public request — which carries a public Host).
        if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return next();
        if (TAILNET_HOSTS.has(host.replace(/:\d+$/, ''))) return next();

        const url = new URL(req.url ?? '/', `https://${host}`);
        const viaQuery = url.searchParams.get('access_token');

        // A valid tokened link ALWAYS re-runs the grant chain — even when this
        // host's cookie is already valid. Heals browsers left half-unlocked
        // (editor cookie set, iframe hosts not) from before the chain existed,
        // and doubles as the recovery path after a token rotation.
        // EMBED HOSTS (sandbox/preview — everything except the first entry,
        // which is the editor) admit same-site subresource loads WITHOUT a
        // cookie. Sec-Fetch-Site is set by the browser and unforgeable from
        // web content: the only same-site pages that can embed these hosts
        // live on *.teddessert.com — i.e. our own editor. This sidesteps
        // per-hostname cookie storage entirely, which privacy extensions
        // routinely block for iframes. The editor host (and with it the
        // /__revyme_disk API) never takes this path — full gate always.
        // `same-origin` is admitted alongside `same-site` because the two
        // cover the two halves of ONE embed. The iframe DOCUMENT is fetched by
        // the editor (a sibling host) and so is `same-site`; every script and
        // asset that document then pulls is fetched by the sandbox page from
        // its OWN origin and so is `same-origin`. Admitting only `same-site`
        // served the HTML and then 401'd all of its JS — the sandbox never
        // booted and the canvas sat empty for exactly the cookie-less browsers
        // this exemption exists for (live find 2026-09-01).
        // This does not widen the boundary: a `same-origin` request can only
        // originate from a document already served by this host, and obtaining
        // one requires either the same-site embed above or a valid cookie. A
        // cross-site page framing us gets `cross-site` on the document and is
        // refused, so it never reaches the point of issuing subresource loads.
        // `none` (a typed URL) stays gated, and the editor host — which owns
        // the /__revyme_disk API — is excluded from `isEmbedHost` entirely.
        const isEmbedHost = PUBLIC_HOSTS.length > 0 && host !== PUBLIC_HOSTS[0] && PUBLIC_HOSTS.includes(host);
        const sfs = String(req.headers['sec-fetch-site'] ?? '');
        if (isEmbedHost && (sfs === 'same-site' || sfs === 'same-origin')) return next();

        const cookieOk = readCookie(req.headers.cookie, COOKIE) === expected;
        if (cookieOk && !(viaQuery && safeEqual(viaQuery, token))) {
          // Self-heal: a top-level page load whose browser never completed a
          // full chain gets one now, so the canvas/preview iframes can never
          // strand at 401. Marker-guarded — one extra pair of 302s per fresh
          // browser, then never again.
          const fetchDest = String(req.headers['sec-fetch-dest'] ?? 'document');
          if (
            fetchDest === 'document' &&
            req.method === 'GET' &&
            url.pathname !== UNLOCK_PATH &&
            readCookie(req.headers.cookie, CHAINED) !== '1'
          ) {
            return grant(url.href);
          }
          return next();
        }

        /** Set this host's cookie, then either hop to the next sibling host
         *  in the chain or land on the final destination. Function declaration
         *  (hoisted): the self-heal branch above its textual position calls it. */
        function grant(finalDest: string) {
          const visited = (url.searchParams.get('visited') ?? '')
            .split(',')
            .filter(Boolean);
          if (!visited.includes(host)) visited.push(host);
          const next = PUBLIC_HOSTS.find((h) => !visited.includes(h));

          let location: string;
          if (next) {
            const hop = new URL(`https://${next}${UNLOCK_PATH}`);
            hop.searchParams.set('access_token', token);
            hop.searchParams.set('visited', visited.join(','));
            hop.searchParams.set('dest', finalDest);
            location = hop.href;
          } else {
            location = finalDest;
          }
          res.statusCode = 302;
          const attrs = `Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 30}`;
          res.setHeader('set-cookie', [
            `${COOKIE}=${expected}; ${attrs}`,
            `${CHAINED}=1; ${attrs}`,
          ]);
          res.setHeader('cache-control', 'no-store');
          res.setHeader('location', location);
          res.end();
        }

        if (viaQuery && safeEqual(viaQuery, token)) {
          if (url.pathname === UNLOCK_PATH) {
            // Mid-chain hop: cookie for this host, continue the chain.
            return grant(safeDest(url.searchParams.get('dest')) ?? `https://${PUBLIC_HOSTS[0] ?? host}/`);
          }
          // Direct tokened link: strip the token, start the chain, come back here.
          url.searchParams.delete('access_token');
          return grant(url.href);
        }

        if (req.method === 'POST') {
          void readBody(req).then((body) => {
            const submitted = new URLSearchParams(body).get('token') ?? '';
            if (safeEqual(submitted, token)) return grant(url.href);
            // eslint-disable-next-line no-console
            console.warn(
              `[access-gate] rejected token from ${req.socket.remoteAddress} for ${host}${url.pathname}`,
            );
            deny(res, 401);
          });
          return;
        }

        const dest = String(req.headers['sec-fetch-dest'] ?? '');
        deny(res, 401, dest === 'iframe' || dest === 'frame');
      });
  }
}
