# Pokemon Stats — Interactive viewer

![Pokémon Stats banner](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png)

Welcome to Pokemon Stats — a sleek, console-style Pokédex UI that highlights each Pokémon's strengths using a radar chart and friendly qualitative badges. This repository is a demo UI (HTML/CSS/React via CDN) intended for learning, styling, and demos.

This project has been styled and hardened for a production-like experience: a full-screen modal detail view (click a character to open the stats screen), animated radar charts, icons, lazy-loaded images, improved accessibility (keyboard modal focus trap & Escape to close), and CI/deploy automation.

## ✨ Highlights

- Console/GitHub gray theme with blue accents and soft glows
- Interactive navigator: search, filter, expand stat popups
- Radar-style stat chart and compact 'Great Stats' badge for standout Pokémon
- Responsive, embeddable single-file UI — works with `python3 -m http.server` or on GitHub Pages

## 🧾 Quick links

- Pokémon Trading Card Game (official): [pokemon.com/pokemon-tcg](https://www.pokemon.com/us/pokemon-tcg/)
- Pokémon Video Games (official): [pokemon.com/video-games](https://www.pokemon.com/us/pokemon-video-games/)
- Find local game & hobby shops (general search tools):
	- [Google Maps search — game stores near me](https://www.google.com/maps/search/game+stores+near+me)
	- [Yelp — Game stores](https://www.yelp.com/search?find_desc=game+stores)
	- [GameStop store locator](https://www.gamestop.com/stores)

## 📦 Files

- `index.html` — application shell (includes React & Babel CDN for quick demo)
- `styles.css` — all theme & UI styles
- `app.js` — React components + data and rendering logic

### Assets gallery

Quick visual references for the supporting images are in `assets/gallery.html`. This page showcases the demo images included in `assets/images/` (Scyther, Scizor, Pikachu, Charizard) and is useful for reviewers and contributors.

You can preview it locally after starting the static server with:

```bash
python3 -m http.server 8000
# open http://localhost:8000/assets/gallery.html
```

### End-to-end testing (Playwright)

We added Playwright end-to-end tests to validate key interactions (modal open/close, hover interactions). CI automatically runs these tests on pull requests and pushes.

To run the tests locally:

```bash
# install dependencies
npm ci
npx playwright install --with-deps
# start a server then run tests
python3 -m http.server 8000 &
npx playwright test
```

There's also a convenience script to run e2e tests from the repo root:

```bash
chmod +x scripts/run_e2e.sh
./scripts/run_e2e.sh
```

### Linting & Lighthouse checks

- ESLint + Prettier are configured and run during CI.
- Lighthouse CI runs on PRs and uploads temporary reports for review (see `.github/workflows/lighthouse-ci.yml`).


## 📋 Project & contribution workflow

This repository uses a lightweight, evergreen process to keep authoritative Pokémon data fresh and maintain a healthy contribution flow.

- Project plan: see `docs/PROJECT_PLAN.md` for the project's mission, workflows and acceptance criteria.
- Contributing guide: `CONTRIBUTING.md` explains how to open issues, submit data changes and run the scheduled data refresh locally.
- Issue templates: use templates to open well-formed bugs, features, or `data-update` issues.

### Automation in this repo

- A scheduled GitHub Action (weekly by default) refreshes the canonical dataset from PokeAPI and opens a PR for review (`.github/workflows/data-refresh.yml`).
- Optional automation to add issues to a Projects board is available (see `.github/workflows/project-sync.yml`) but requires secrets to be set (PAT + project column ids).

#### Create the project board locally (if you want to do it yourself)

If your `gh` CLI is authenticated with a PAT that includes project scopes you can create and populate the classic project board with the included script:

```bash
# run from repo root
chmod +x scripts/create_project_board.sh
./scripts/create_project_board.sh paulmmoore3416 Pokemon-Go-Stats
```

The script will create a classic project, 3 columns (To Do / In Progress / Done) and populate them based on issue labels.


## 🚀 Production-ready features added

- Full-screen modal view that matches a console / game UI; click a character to open the "profile" screen.
- Pixel-tuned fonts and color palette (Rubik + Inter) and improved contrast for accessibility.
- Animated radar chart with a soft glow and polygon draw animation for better visual feedback.
- Type icons for moves, star-stamp animation, parallax background behind the character in modal for motion polish.
- Accessibility: focus trapping in modal, ARIA attributes, keyboard close (Escape) and clickable outside backdrop.
- Performance: responsive srcset images + lazy loading of artwork so the page performs under heavy traffic.
- CI: lightweight GitHub Actions CI for PRs and pushes.
- Deploy: GitHub Actions deploys `production` branch to GitHub Pages automatically.
- Security: `production` branch has branch protection (require 1 PR review and CI checks) and Dependabot is configured to update GitHub Actions weekly.

## 🧪 Run locally

1. Start a quick static server in the repository root:

```bash
python3 -m http.server 8000
```

2. Open http://localhost:8000 in your browser

## 📣 Publishing
If you'd like me to create a public GitHub repository named `Pokemon-Stats` and push this code there, I can do that for you — tell me the username or organization you want the repo under (or authorize me). I will ensure the repo is public and does not include any secrets.

## 🧾 Notes
- All assets used are from public sprite sources; no private data or credentials are included.

---

If you want the README even more graphical (icons for each Pokémon, animated GIFs, or badges), say the word and I’ll add them next.

---

If you'd like, I can now:

- Set the Pages source to the `gh-pages` branch (or `production`) and configure automatic cache headers.
- Add lightweight Lighthouse checks to the CI workflow and fail merges below thresholds.
- Add small end-to-end tests for UI interactions (puppeteer/playwright) to keep quality high on high-traffic sites.

## Next steps & recommended improvements

See `docs/RECOMMENDATIONS.md` for the prioritized enhancements (Playwright tests, Lighthouse CI, visual regression, and automation) which will help maintain this as a living, high-quality project.