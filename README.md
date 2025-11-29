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