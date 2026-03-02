# Yokka logo pack

Source files:
- `yokkalogo.png` (master)
- `yokkalogo.jpg`
- `yokkalogo.webp`
- `logo-wordmark-yokka-blue.svg` / `.png`
- `logo-wordmark-ekka-blue.svg` / `.png`

Generate all favicon/logo assets:

```bash
cd /Users/mns/Desktop/yokka/logo
chmod +x generate-assets.sh
./generate-assets.sh
```

Generated set:
- Favicons: `favicon.ico`, `favicon-*.png`
- Apple: `apple-touch-icon*.png`
- Android/PWA: `android-chrome-*.png`, `icon-*-maskable.png`
- Microsoft tiles: `mstile-*.png`, `browserconfig.xml`
- SEO social: `og-image-1200x630.png`, `twitter-image-1200x600.png`
- Integration files: `site.webmanifest`, `head-seo-snippet.html`
- Wordmarks: `logo-wordmark-yokka-blue.*`, `logo-wordmark-ekka-blue.*`
