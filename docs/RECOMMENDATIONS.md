# Top recommendations & enhancements

This section lists practical improvements and useful third-party tools to make Pokemon-Go-Stats a robust, well-tested, continuously-delivered project.

## Priority (High)
- Add Playwright end-to-end tests for the most important UX flows (hover panels, modal open/close, keyboard accessibility). These will protect regressions from UI changes.
- Add Lighthouse CI (lhci or github action) to the CI pipeline — set thresholds for performance, accessibility and best practices.
- Enforce linting (ESLint) and formatters (Prettier) via husky + lint-staged to avoid noisy PRs.

## Recommended (Medium)
- Visual regression testing with Percy or Playwright snapshot comparisons for the radar charts, modal, and hover popups.
- Add code coverage reporting (Codecov or Coveralls) and gate merges on drop in coverage.
- Add a weekly dependabot schedule and optionally a Snyk vulnerability scanner for security checks.

## Nice-to-have (Low)
- PR preview deploys for each PR (Netlify / Vercel / GitHub Pages preview) to make reviewing UI changes easier.
- A small scheduled synthetic monitoring job (e.g., uptime check or Playwright smoke test) that notifies on failures.

## Tools & Action steps
- Playwright: https://playwright.dev — use GitHub Actions + playwright/test.
- Lighthouse / LHCI: https://github.com/GoogleChrome/lighthouse-ci
- Percy: https://percy.io/ (or Playwright snapshot testing)
