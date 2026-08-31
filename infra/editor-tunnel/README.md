# Remote studio access — Tunnel + Access

Lets any browser reach the studio at **https://editor.teddessert.com** while it
runs on whatever machine has the repo. Identity is enforced at Cloudflare's
edge (Access), so the studio contains zero auth code.

```
browser ──▶ access gate (token) ──▶ Tunnel ──▶ this machine
              editor.teddessert.com   → localhost:3333  (editor)
              sandbox-editor.…        → localhost:5174  (canvas iframe)
              preview-editor.…        → localhost:5175  (preview iframe)
```

## One-time setup

**Auth: shared-secret gate (active by default).** `vite-plugins/access-gate.ts`
challenges every request arriving on a public hostname and only passes those
carrying the token in `.env.studio` (gitignored, generated per machine). The
raw token is never echoed back — the cookie holds a hash of it. Localhost is
unaffected.

Cloudflare Access is the better answer if you ever activate Zero Trust
(identity at the edge, no secret to share); this gate exists so remote editing
does not depend on accepting Zero Trust terms and billing authorization. If you
adopt Access later, unset `REVYME_ACCESS_TOKEN` and the gate goes inert.

**Start everything** (two terminals, either computer):

```bash
npm run studio:public        # studio with public-host envs
./infra/editor-tunnel/up.sh  # tunnel (first run: browser login + DNS routes)
```

## Daily use

Same two commands. Open https://editor.teddessert.com, enter the token once,
design. **Log in on the editor tab first** — the sandbox/preview iframes
piggyback on the cookie set there; loading an iframe hostname cold shows the
unlock form inside the frame instead.

## Rules of the road

- **One live editor per project at a time** — conflict-guard makes overlap
  safe (409 + reload), not pleasant.
- The machine running the studio is the machine whose checkout gets edited —
  pull before a session if you've pushed from elsewhere.
- `.config.runtime.yml` (contains the credentials path) is gitignored; the
  committed `config.yml` is credential-free.
