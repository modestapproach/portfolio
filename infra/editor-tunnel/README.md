# Remote studio access — Tunnel + Access

Lets any browser reach the studio at **https://editor.teddessert.com** while it
runs on whatever machine has the repo. Identity is enforced at Cloudflare's
edge (Access), so the studio contains zero auth code.

```
browser ──▶ Cloudflare Access (who are you?) ──▶ Tunnel ──▶ this machine
              editor.teddessert.com   → localhost:3333  (editor)
              sandbox-editor.…        → localhost:5174  (canvas iframe)
              preview-editor.…        → localhost:5175  (preview iframe)
```

## One-time setup

**1. Access policies — DO THIS FIRST** (dashboard → Zero Trust → Access →
Applications → Add → Self-hosted):

- One application, add all three hostnames to it: `editor.teddessert.com`,
  `sandbox-editor.teddessert.com`, `preview-editor.teddessert.com`.
- Policy: Allow → Include → Emails → `theodoreyd@gmail.com`.
- Login method: One-time PIN (zero config) and/or Google.
- Do **NOT** use a `*.teddessert.com` wildcard app — it would put the public
  site's `www` behind a login.

Without this step the editor API (file writes + git push = publishing to
teddessert.com) is open to the internet. `up.sh` reminds you.

**2. Start everything** (two terminals, either computer):

```bash
npm run studio:public        # studio with public-host envs
./infra/editor-tunnel/up.sh  # tunnel (first run: browser login + DNS routes)
```

## Daily use

Same two commands. Open https://editor.teddessert.com, pass the Access login,
design. **Log in on the editor tab first** — the sandbox/preview iframes
piggyback on the Access session created there; loading an iframe hostname cold
can wedge inside the frame.

## Rules of the road

- **One live editor per project at a time** — conflict-guard makes overlap
  safe (409 + reload), not pleasant.
- The machine running the studio is the machine whose checkout gets edited —
  pull before a session if you've pushed from elsewhere.
- `.config.runtime.yml` (contains the credentials path) is gitignored; the
  committed `config.yml` is credential-free.
