# GitHub Copilot / AI Agent Instructions for this repository ✅

## Big picture
- This is a **Create React App** SPA (see `package.json` scripts). Main entry: `src/index.js` ➜ `src/App.js`. The app renders a single-page portfolio with an extra route at `/certificates`.
- Visual behavior relies on two cross-cutting systems:
  - **LocomotiveScroll** for smooth scrolling: initialized in `src/App.js` on the `div` with `data-scroll-container`. Many sections use `data-scroll-section` attributes.
  - **Canvas particle background & theme** in `src/App.js` (hooks + window listeners) — the global `mode` state controls CSS classes (`good-mode`, `evil-mode`, `very-evil-mode`).

## Where to start for common tasks 🔍
- Run locally: `npm start` (dev server via `react-scripts`).
- Build: `npm run build`.
- Tests: `npm test` (uses react-testing-library via CRA). Note: current tests include default placeholder text that may need updating.

## Important files & patterns (do not assume defaults) 📁
- `src/App.js` — central state, routing (`Routes`/`Route`), LocomotiveScroll init/destroy, canvas background. If you change layout or add new route sections, check scroll initialization and `data-scroll-*` attributes.
- `src/components/Certificates.js` — certificate metadata is hard-coded in `certificateData`. If you add/remove certificate PDFs, update this file *and* the `public/certs` folder.
- `public/certs/` — static PDFs are served here and referenced by the Certificates component via `/certs/<filename>` and by `public/certificates.html`.
- `public/certificates.html` — a separate static version (vanilla JS) that mirrors the React `Certificates` page. If you modify certificates behavior, reconcile changes between the React component and this static page to avoid duplication drift.
- Styling: global CSS in `src/App.css` and `src/index.css`. Component code uses plain CSS class names (no CSS Modules).

## Project-specific conventions & gotchas ⚠️
- Smooth scroll requires `data-scroll-container` on the outer container and `data-scroll-section` on sections; forgetting these will break LocomotiveScroll behavior.
- When adding or modifying DOM structure that LocomotiveScroll controls, call `locomotiveScrollRef.current.update()` or ensure the effect re-initializes — see the cleanup/initialization logic in `src/App.js`.
- Certificates filenames contain spaces and punctuation. Use exact filenames from `public/certs` (see file names in repository) when linking or embedding PDFs.
- Navigation uses plain anchor links (e.g., `/#projects`) rather than `react-router-dom` `Link` for in-page sections. For new nav items, prefer anchors to keep smooth-scrolling behavior intact.
- `express` is present in `package.json` but not used in source — likely removable unless you plan to add a server.

## Editing guidance & code examples ✍️
- Add a new route: update `src/App.js` `Routes` block and create the component under `src/components/`.
- Add a certificate: place `file.pdf` in `public/certs/` and add an entry in `src/components/Certificates.js` (and optionally in `public/certificates.html` if you want the static mirror updated).
- Updating global theme: change classes in `src/App.css` and ensure components respect the `mode` state if they rely on theme colors.

## Tests & CI tips 🧪
- Tests run via CRA `npm test`. The existing test expects a placeholder ("learn react") — update tests to match current rendered output.
- No CI configuration detected; add GitHub Actions workflows if you want automated lint/test/build steps.

## When in doubt — quick check list ✅
- Does the page/container have `data-scroll-container` and `data-scroll-section` as needed?
- If certificates are changed, are the files present in `public/certs` and listed in `src/components/Certificates.js` (or `public/certificates.html`)?
- If you change global layout, does LocomotiveScroll get updated/destroyed and reinitialized correctly?

---
If anything looks incomplete or you want more details (example PR template, CI workflow, or specific test updates), tell me which section to expand and I’ll iterate. ✨
