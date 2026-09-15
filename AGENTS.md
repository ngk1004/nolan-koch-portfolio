# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **React + Vite + TypeScript + Tailwind** single-page site for the **Lithos** geology brand hero.

### Project shape
- **Stack:** React 18+, TypeScript, Vite, Tailwind CSS v4, lucide-react.
- **Entry:** [`index.html`](index.html) → [`src/main.tsx`](src/main.tsx) → [`src/App.tsx`](src/App.tsx).
- **Hero:** [`src/components/Hero.tsx`](src/components/Hero.tsx) with cursor-following spotlight reveal via [`src/components/RevealLayer.tsx`](src/components/RevealLayer.tsx).
- **Styles:** [`src/index.css`](src/index.css) — Inter + Playfair Display fonts, hero load animations.
- Previous static portfolio preserved in [`index.backup.html`](index.backup.html).
- [`server.py`](server.py) — stdlib static server; serves `dist/` when built.

### Site sections
1. **Fixed nav** — Lithos wordmark, center pill links (desktop), Sign Up, mobile hamburger.
2. **Full-screen hero** — dual-image cursor spotlight reveal, headline, copy blocks, CTA.

### Design
- Fonts: **Inter** (UI), **Playfair Display italic** (display/wordmark).
- Accent: `#e8702a` (CTA orange).
- Hero height: `100dvh`.

### Run locally
- `npm install` (first time)
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build && python3 server.py` — production build at http://localhost:8000
- `npm run preview` — preview built output via Vite

### Gotchas
- **Browser caching:** hard refresh (Cmd+Shift+R) after builds, or use a cache-busting query string.
- **Cursor reveal:** uses canvas-generated radial mask; requires mouse movement on desktop.
- **Reduced motion:** hero animations respect `prefers-reduced-motion`.
- External hero images load from `images.higgs.ai`.

### Deploy
- GitHub Pages via [`.github/workflows/jekyll-gh-pages.yml`](.github/workflows/jekyll-gh-pages.yml) on push to `main`.
- Workflow runs `npm ci && npm run build` and uploads `dist/`.
- Live URL: `https://ngk1004.github.io/nolan-koch-portfolio/`
- Vite `base` must stay `/nolan-koch-portfolio/` for project Pages paths to resolve.
