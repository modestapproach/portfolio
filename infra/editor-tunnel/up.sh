#!/usr/bin/env bash
# Bring up remote access to the studio: cloudflared tunnel + the three public
# hostnames. First run does one-time setup (browser login, tunnel creation,
# DNS routes); later runs just start the tunnel.
#
#   ./infra/editor-tunnel/up.sh          # start (and set up if needed)
#
# The studio itself must be running in public mode: `npm run studio:public`
# from the repo root (sets the REVYME_*/VITE_* public-host envs).
set -euo pipefail

TUNNEL_NAME="revyme-editor"
HERE="$(cd "$(dirname "$0")" && pwd)"
CONFIG="$HERE/config.yml"
RUNTIME_CONFIG="$HERE/.config.runtime.yml"   # gitignored: has credentials path

command -v cloudflared >/dev/null || {
  echo "cloudflared not installed. Run:  brew install cloudflared"
  exit 1
}

# One-time: authenticate cloudflared with your Cloudflare account (opens a
# browser; pick the teddessert.com zone).
CERT="$HOME/.cloudflared/cert.pem"
[ -f "$CERT" ] || cloudflared tunnel login

# One-time: create the named tunnel.
if ! cloudflared tunnel list 2>/dev/null | grep -q "$TUNNEL_NAME"; then
  cloudflared tunnel create "$TUNNEL_NAME"
fi
TUNNEL_ID=$(cloudflared tunnel list | awk -v n="$TUNNEL_NAME" '$2==n {print $1}')
CREDS="$HOME/.cloudflared/${TUNNEL_ID}.json"

# One-time: DNS routes (idempotent — errors about existing records are fine).
for h in editor.teddessert.com sandbox-editor.teddessert.com preview-editor.teddessert.com; do
  cloudflared tunnel route dns "$TUNNEL_NAME" "$h" 2>/dev/null || true
done

# Stamp the runtime config (committed config stays credential-free).
sed -e "s|^tunnel: .*|tunnel: ${TUNNEL_ID}|" \
    -e "s|^credentials-file: .*|credentials-file: ${CREDS}|" \
    "$CONFIG" > "$RUNTIME_CONFIG"

echo
echo "Tunnel up. Editor is protected by the shared-secret gate"
echo "(REVYME_ACCESS_TOKEN in .env.studio). Unlock once at:"
echo "  https://editor.teddessert.com"
echo
exec cloudflared tunnel --config "$RUNTIME_CONFIG" run "$TUNNEL_NAME"
