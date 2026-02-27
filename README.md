# Yokka UI Design System

## Local Storybook

```bash
npm run storybook
```

## Global Storybook URL (GitHub Pages)

Storybook auto-deploy is configured in:

- `.github/workflows/storybook-pages.yml`

After push to `main`, GitHub Actions publishes Storybook to Pages.

Expected public URL for this repository:

- `https://magamadovnurid.github.io/yokka/`

If this is the first deployment, open GitHub repository settings and ensure:

- `Settings -> Pages -> Source: GitHub Actions`
