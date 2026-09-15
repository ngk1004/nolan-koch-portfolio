# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **React + Vite + TypeScript + Tailwind** recruiter-facing portfolio for **Nolan Koch**.

### Project shape
- **Stack:** React 19, TypeScript, Vite, Tailwind CSS v4.
- **Entry:** [`index.html`](index.html) → [`src/main.tsx`](src/main.tsx) → [`src/App.tsx`](src/App.tsx).
- **Content registry:** [`src/data/site.ts`](src/data/site.ts) owns identity, research, projects, and stack.
- **Sections:** SiteNav, Hero, Research, Work, Stack, Contact under [`src/components/`](src/components/).
- **Assets:** project images in [`public/images/`](public/images/).
- Previous static snapshot preserved in [`index.backup.html`](index.backup.html).
- [`server.py`](server.py) serves `dist/` when built.

### Design
- Fonts: **Outfit** (UI/display), **IBM Plex Mono** (meta).
- Accent: `#d4ff58` on ink `#0b0a09`.
- Recruiter scan path: name → NeurIPS proof → selected work → stack → contact.

### Run locally
- `npm install` (first time)
- `npm run dev` — Vite at http://localhost:5173/nolan-koch-portfolio/
- `npm run build && python3 server.py` — production at http://localhost:8000
- `npm run preview` — Vite preview of `dist/`

### Deploy
- GitHub Pages via [`.github/workflows/jekyll-gh-pages.yml`](.github/workflows/jekyll-gh-pages.yml) on push to `main`.
- Live URL: `https://ngk1004.github.io/nolan-koch-portfolio/`
- Vite `base` must stay `/nolan-koch-portfolio/`.
