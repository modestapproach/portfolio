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
| runs | studio:serve (prod bundle) + cloudflared, as launchd agents | `npm run dev:studio` on localhost |
| URL | https://editor.teddessert.com — or http://mini:3333 on Tailscale (no token) | http://localhost:3333 |
| setup | `up.sh` once, then `WITH_TUNNEL=1 install-macos.sh` | nothing beyond `npm ci` |

The mini serves ONE production bundle (`npm run studio:build`) that works on
localhost, the tailnet, and the tunnel — the public sandbox/preview origins
are baked in but only activate when the page is opened on
editor.teddessert.com. After changing studio source, rebuild and restart:

```bash
npm run studio:build
pkill -f "apps/studio/node_modules/.bin/vite"; pkill -f "apps/studio/node_modules/.bin/concurrently"
launchctl kickstart -k "gui/$(id -u)/com.teddessert.revyme.studio"
```

The laptop never needs public mode or the token — it edits locally, where the
Claude Code co-editing loop is fastest. The mini is what you reach from a
phone, an iPad, or anywhere you are not.

## Mac mini — one-time setup

```bash
./infra/editor-tunnel/up.sh          # interactive: opens a browser, creates
                                     # the tunnel + DNS. Ctrl-C once it says
                                     # "Tunnel up".
WITH_TUNNEL=1 ./infra/editor-tunnel/install-macos.sh   # launchd agents (permanent)
```

Without `WITH_TUNNEL=1` only the studio agent is installed and
editor.teddessert.com answers 530 (tailnet access still works).

After that the editor survives reboots and crashes with nothing left open.
Uninstall with `./infra/editor-tunnel/install-macos.sh --stop`.

Logs: `~/Library/Logs/revyme/{studio,tunnel}.log`

## Daily use

Open https://editor.teddessert.com, enter the token once — the gate then silently unlocks the sandbox and preview hostnames via a redirect chain, so one entry covers everything for 30 days per browser. design. **Log in on the editor tab first** — the sandbox/preview iframes
are unlocked by the same chain.

## Rules of the road

- **One live editor per project at a time** — conflict-guard makes overlap
  safe (409 + reload), not pleasant.
- The machine running the studio is the machine whose checkout gets edited —
  pull before a session if you've pushed from elsewhere.
- `.config.runtime.yml` (contains the credentials path) is gitignored; the
  committed `config.yml` is credential-free.
