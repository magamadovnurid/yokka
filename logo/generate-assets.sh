#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_PNG="$ROOT_DIR/yokkalogo.png"
BRAND_BG="#0A5BA2"

if [[ ! -f "$SOURCE_PNG" ]]; then
  echo "Missing source image: $SOURCE_PNG"
  exit 1
fi

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick is required. Install with: brew install imagemagick"
  exit 1
fi

render_square() {
  local size="$1"
  local out="$2"
  magick "$SOURCE_PNG" -resize "${size}x${size}" "$ROOT_DIR/$out"
}

render_wide_canvas() {
  local width="$1"
  local height="$2"
  local logo_size="$3"
  local out="$4"
  magick -size "${width}x${height}" "xc:${BRAND_BG}" \
    \( "$SOURCE_PNG" -resize "${logo_size}x${logo_size}" \) \
    -gravity center -composite \
    "$ROOT_DIR/$out"
}

# Favicons
for size in 16 32 48 64 96 128 256; do
  render_square "$size" "favicon-${size}x${size}.png"
done
magick "$ROOT_DIR/favicon-16x16.png" "$ROOT_DIR/favicon-32x32.png" "$ROOT_DIR/favicon-48x48.png" "$ROOT_DIR/favicon.ico"

# Apple touch icons
for size in 120 152 167 180; do
  render_square "$size" "apple-touch-icon-${size}x${size}.png"
done
cp "$ROOT_DIR/apple-touch-icon-180x180.png" "$ROOT_DIR/apple-touch-icon.png"

# Android + PWA icons
for size in 192 512; do
  render_square "$size" "android-chrome-${size}x${size}.png"
done
cp "$ROOT_DIR/android-chrome-192x192.png" "$ROOT_DIR/icon-192x192.png"
cp "$ROOT_DIR/android-chrome-512x512.png" "$ROOT_DIR/icon-512x512.png"
cp "$ROOT_DIR/android-chrome-192x192.png" "$ROOT_DIR/icon-192x192-maskable.png"
cp "$ROOT_DIR/android-chrome-512x512.png" "$ROOT_DIR/icon-512x512-maskable.png"

# Microsoft tile icons
render_square 70 "mstile-70x70.png"
render_square 150 "mstile-150x150.png"
render_square 310 "mstile-310x310.png"
render_wide_canvas 310 150 128 "mstile-310x150.png"

# Product and brand logo sizes
for size in 64 128 256 512 1024; do
  render_square "$size" "logo-${size}x${size}.png"
done
cp "$ROOT_DIR/logo-512x512.png" "$ROOT_DIR/logo-square.png"

# Social SEO previews
render_wide_canvas 1200 630 420 "og-image-1200x630.png"
render_wide_canvas 1200 600 420 "twitter-image-1200x600.png"

echo "Generated full logo and favicon pack in: $ROOT_DIR"
