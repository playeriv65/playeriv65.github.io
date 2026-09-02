# Zelin Li | Personal Website

This is the repository for my personal website, built with [Astro](https://astro.build).

## Overview

- **Minimalist Design**: Inspired by Apple's clean, high-contrast aesthetics.
- **Bilingual Support**: Native English and Chinese (i18n) routing without heavy client-side plugins.
- **Performance First**: Zero unnecessary client-side JavaScript, leveraging Astro's static site generation.

## Design reference

The academic information architecture was informed by
[`rubzip/academic-portfolio-astro`](https://github.com/rubzip/academic-portfolio-astro)
(MIT License). The implementation and visual system in this repository are custom and intentionally smaller.

## Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

## Deployment

The site is built as static HTML and deployed automatically on every push to `main`:

- **GitHub Pages** is the canonical static host.
- **playeriv65.com** is served through Cloudflare.
- The existing GitHub Actions workflow also refreshes the configured VPS mirror.
