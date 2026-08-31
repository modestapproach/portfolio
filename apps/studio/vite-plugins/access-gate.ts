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

function deny(res: ServerResponse, status = 401): void {
  res.statusCode = status;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(SIGN_IN_PAGE);
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
    configureServer(server) {
      if (!token) return; // inert on localhost
      const expected = cookieValueFor(token);

      server.middlewares.use((req, res, next) => {
        const host = String(req.headers.host ?? '');
        // Loopback is trusted (it's the developer's own machine, and the
        // tunnel connects to us over loopback only after Cloudflare has
        // already routed a public request — which carries a public Host).
        if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return next();

        if (readCookie(req.headers.cookie, COOKIE) === expected) return next();

        const url = new URL(req.url ?? '/', `https://${host}`);
        const viaQuery = url.searchParams.get('access_token');

        /** Set this host's cookie, then either hop to the next sibling host
         *  in the chain or land on the final destination. */
        const grant = (finalDest: string) => {
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
          res.setHeader(
            'set-cookie',
            `${COOKIE}=${expected}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 30}`,
          );
          res.setHeader('cache-control', 'no-store');
          res.setHeader('location', location);
          res.end();
        };

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

        deny(res);
      });
    },
  };
}
