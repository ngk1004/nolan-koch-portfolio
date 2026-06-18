# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **single-page static portfolio website**. There is no build system, package manager, or backend.

### Project shape
- Everything lives in `index.html` — all CSS and JavaScript are **inline** in that one file. (The README mentions separate `styles.css`/`script.js`, but those files do not exist.)
- Project images are in `images/`.
- `server.py` is a tiny stdlib-only static file server (no third-party packages).

### Run it locally
- `python3 server.py` serves the site at http://localhost:8000 (port is hardcoded). It also calls `webbrowser.open`, which may print a harmless error in headless environments.
- Alternative: `python3 -m http.server 8000` from the repo root.
- There is nothing to install — Python 3 (stdlib) is the only requirement.

### Gotchas
- **Browser caching:** the static handler sends caching headers, so after editing `index.html` the browser may keep serving the old page. When testing changes, do a hard refresh (Ctrl+Shift+R) or hit a cache-busting URL like `http://localhost:8000/?v=2`.
- No tests, no linter, and no build step are configured in this repo.

### Deploy
- Production deploys via GitHub Pages using `.github/workflows/jekyll-gh-pages.yml` on push to `main`; custom domain is set by `CNAME`.
