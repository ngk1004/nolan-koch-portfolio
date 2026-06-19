# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **single-page static portfolio website**. There is no build system, package manager, or backend.

### Project shape
- Everything lives in `index.html` — all CSS and JavaScript are **inline** in that one file.
- Previous design is preserved in `index.backup.html` for rollback.
- Project images are in `images/`.
- `server.py` is a tiny stdlib-only static file server (no third-party packages).

### Site sections (top to bottom)
1. **Intro splash** — NK initials avatar, auto-dismisses or SKIP; skipped for rest of session via `sessionStorage`.
2. **Hero** (`#hero`) — headline, stats row, CTAs including OpenReview paper link.
3. **Stats band** — NeurIPS 2025, 10+ projects, 18× CUDA, 50k+ records.
4. **About** (`#about`) — bio, quote panel.
5. **Research** (`#research`) — featured NeurIPS 2025 TMMA paper with abstract and keywords.
6. **Work** (`#work`) — horizontal pinned carousel (desktop) / scroll-snap row (mobile); 10 projects from [github.com/ngk1004](https://github.com/ngk1004), each with description.
7. **Capabilities** (`#capabilities`) — three service cards.
8. **Toolkit** (`#toolkit`) — grouped tech stack grid.
9. **Journey** (`#journey`) — education/research timeline.
10. **Contact** (`#contact`) — mailto form + direct links.

### Design
- Dark editorial theme inspired by abdulbasit-005.vercel.app.
- Fonts: **Instrument Serif**, **DM Sans**, **IBM Plex Mono** (Google Fonts).
- Accent color: `#d4ff58` (lime on near-black `#0b0a09`).

### Run it locally
- `python3 server.py` serves the site at http://localhost:8000 (port is hardcoded). It also calls `webbrowser.open`, which may print a harmless error in headless environments.
- Alternative: `python3 -m http.server 8000` from the repo root.
- There is nothing to install — Python 3 (stdlib) is the only requirement.

### Gotchas
- **Browser caching:** the static handler sends caching headers, so after editing `index.html` the browser may keep serving the old page. When testing changes, do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R) or hit a cache-busting URL like `http://localhost:8000/?v=2`.
- **Intro splash:** clear `sessionStorage.introSeen` in devtools to re-test the intro.
- **Work carousel pin:** recalculates on scroll/resize/load; desktop only (>1024px).
- Contact form opens the user's mail client via `mailto:` (no server-side handler).
- No tests, no linter, and no build step are configured in this repo.

### Deploy
- Production deploys via GitHub Pages using `.github/workflows/jekyll-gh-pages.yml` on push to `main`; custom domain is set by `CNAME` (`nolank.dev`).
