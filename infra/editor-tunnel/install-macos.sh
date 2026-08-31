#!/usr/bin/env bash
# Install the always-on editor on this Mac (intended for the Mac mini).
#
# Creates two launchd agents so the studio and the tunnel start at login and
# restart on crash — editor.teddessert.com then works permanently, with no
# terminal left open.
#
#   ./infra/editor-tunnel/install-macos.sh          # install + start
#   ./infra/editor-tunnel/install-macos.sh --stop   # stop + uninstall
#
# Prerequisite (interactive, once): ./infra/editor-tunnel/up.sh has been run
# far enough to create the tunnel and its credentials. See README.md.
set -euo pipefail

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
AGENTS="$HOME/Library/LaunchAgents"
LOGS="$HOME/Library/Logs/revyme"
STUDIO_LABEL="com.teddessert.revyme.studio"
TUNNEL_LABEL="com.teddessert.revyme.tunnel"
TUNNEL_NAME="revyme-editor"
RUNTIME_CONFIG="$REPO/infra/editor-tunnel/.config.runtime.yml"

# Absolute paths — launchd does not inherit a login shell's PATH.
NODE_BIN="$(dirname "$(command -v node)")"
BREW_BIN="$(dirname "$(command -v cloudflared 2>/dev/null || echo /opt/homebrew/bin/x)")"
NPM="$(command -v npm)"
CLOUDFLARED="$(command -v cloudflared || true)"

unload() {
  for L in "$STUDIO_LABEL" "$TUNNEL_LABEL"; do
    launchctl bootout "gui/$(id -u)/$L" 2>/dev/null || true
    rm -f "$AGENTS/$L.plist"
  done
}

if [ "${1:-}" = "--stop" ]; then
  unload
  echo "Stopped and uninstalled. editor.teddessert.com will stop resolving to this Mac."
  exit 0
fi

[ -n "$CLOUDFLARED" ] || { echo "cloudflared missing — brew install cloudflared"; exit 1; }
if [ "${WITH_TUNNEL:-0}" = "1" ]; then
  [ -f "$RUNTIME_CONFIG" ] || {
    echo "Tunnel not set up yet. Run $REPO/infra/editor-tunnel/up.sh first."; exit 1; }
  [ -f "$REPO/.env.studio" ] || { echo "Missing $REPO/.env.studio (access token)"; exit 1; }
fi

mkdir -p "$AGENTS" "$LOGS"
unload  # idempotent reinstall

cat > "$AGENTS/$STUDIO_LABEL.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$STUDIO_LABEL</string>
  <key>ProgramArguments</key>
  <array><string>$NPM</string><string>run</string><string>${STUDIO_SCRIPT:-studio:serve}</string></array>
  <key>WorkingDirectory</key><string>$REPO</string>
  <key>EnvironmentVariables</key>
  <dict><key>PATH</key><string>$NODE_BIN:$BREW_BIN:/usr/bin:/bin:/usr/sbin:/sbin</string></dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$LOGS/studio.log</string>
  <key>StandardErrorPath</key><string>$LOGS/studio.err.log</string>
</dict></plist>
PLIST

cat > "$AGENTS/$TUNNEL_LABEL.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$TUNNEL_LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$CLOUDFLARED</string><string>tunnel</string>
    <string>--config</string><string>$RUNTIME_CONFIG</string>
    <string>run</string><string>$TUNNEL_NAME</string>
  </array>
  <key>WorkingDirectory</key><string>$REPO</string>
  <key>EnvironmentVariables</key>
  <dict><key>PATH</key><string>$BREW_BIN:/usr/bin:/bin:/usr/sbin:/sbin</string></dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$LOGS/tunnel.log</string>
  <key>StandardErrorPath</key><string>$LOGS/tunnel.err.log</string>
</dict></plist>
PLIST

launchctl bootstrap "gui/$(id -u)" "$AGENTS/$STUDIO_LABEL.plist"
# The public tunnel is opt-in (WITH_TUNNEL=1): daily editing rides the
# tailnet (http://mini:3333 from any tailnet device) with no gate at all.
if [ "${WITH_TUNNEL:-0}" = "1" ]; then
  launchctl bootstrap "gui/$(id -u)" "$AGENTS/$TUNNEL_LABEL.plist"
else
  rm -f "$AGENTS/$TUNNEL_LABEL.plist"
fi

echo "Installed and started:"
echo "  studio  → $LOGS/studio.log"
echo "  tunnel  → $LOGS/tunnel.log"
echo
if [ "${WITH_TUNNEL:-0}" = "1" ]; then
  echo "Give it ~20s, then open https://editor.teddessert.com (token in .env.studio)"
else
  echo "Give it ~20s, then from any Tailscale device open:  http://mini:3333"
fi
