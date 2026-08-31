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

## Which machine runs what

| | Mac mini (always on) | Laptop |
|---|---|---|
| role | the always-on editor server | design + AI co-editing |
| runs | studio:public + cloudflared, as launchd agents | `npm run dev:studio` on localhost |
| URL | https://editor.teddessert.com | http://localhost:3333 |
| setup | `up.sh` once, then `install-macos.sh` | nothing beyond `npm ci` |

The laptop never needs public mode or the token — it edits locally, where the
Claude Code co-editing loop is fastest. The mini is what you reach from a
phone, an iPad, or anywhere you are not.

## Mac mini — one-time setup

```bash
./infra/editor-tunnel/up.sh          # interactive: opens a browser, creates
                                     # the tunnel + DNS. Ctrl-C once it says
                                     # "Tunnel up".
./infra/editor-tunnel/install-macos.sh   # installs launchd agents (permanent)
```

After that the editor survives reboots and crashes with nothing left open.
Uninstall with `./infra/editor-tunnel/install-macos.sh --stop`.

Logs: `~/Library/Logs/revyme/{studio,tunnel}.log`

## Daily use

Open https://editor.teddessert.com, enter the token once, design. **Log in on the editor tab first** — the sandbox/preview iframes
piggyback on the cookie set there; loading an iframe hostname cold shows the
unlock form inside the frame instead.

## Rules of the road

- **One live editor per project at a time** — conflict-guard makes overlap
  safe (409 + reload), not pleasant.
- The machine running the studio is the machine whose checkout gets edited —
  pull before a session if you've pushed from elsewhere.
- `.config.runtime.yml` (contains the credentials path) is gitignored; the
  committed `config.yml` is credential-free.
