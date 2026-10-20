#!/usr/bin/env bash
# Renders the home OG images (public/og-home-{en,es}.png) from the HTML templates with headless Chrome.
# Fonts come from Google Fonts, so it needs network. Run from the repo root.
set -euo pipefail
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for lang in en es; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=4000 \
    --screenshot="$PWD/public/og-home-$lang.png" "file://$PWD/scripts/og/home-$lang.html"
done
