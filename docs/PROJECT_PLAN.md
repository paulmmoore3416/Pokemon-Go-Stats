# Pokemon-Go-Stats — Evergreen Data & Feature Project Plan

This document defines the ongoing project scope, priorities, automation, and operating model for Pokemon-Go-Stats — a live, data-driven interactive Pokédex UI that continually ingests authoritative Pokémon data.

## Mission
Keep the site authoritative, accessible, performant and always up-to-date with official Pokémon data (PokeAPI) while evolving features and improving quality.

## Goals
- Maintain an up-to-date dataset synced regularly from PokeAPI.
- Ensure the UI is tested (unit + integration + visual) for safe UX changes.
- Maintain CI-driven quality gates (lint, tests, accessibility, performance checks).
- Keep contributor experience smooth: clear templates, automation, and stable release process.

## Scope & Workstreams

### 1) Data
- Automated refresh and validation of canonical data files (e.g., `data/pokemon.json`).
- Scheduled jobs open PRs for human review before merging.
- Data validation catches schema drift and duplicate or missing entries.

### 2) Features
- UX and feature improvements (hover modal, sorting and filters, accessibility).
- Add instrumentation for feature usage and slow-path features.

### 3) Quality
- Unit tests for data transforms and critical business logic.
- Playwright/E2E tests for modal/hover interactions.
- Visual regression tests for important UI surfaces (radar charts, modals).

### 4) CI / CD / Automation
- GitHub Actions CI for PRs with checks & tests.
- Scheduled data pull + auto-PR workflow.
- Optional automation to place issues in the Project board by label.

## Roadmap & Priorities
- Data reliability (always synchronized) — top priority.
- Accessibility & tests (PR gates) — high.
- Visual regression & performance budgets — medium.
- Feature work and UX polish — ongoing continuous delivery.

## Acceptance Criteria (+ definition of done)
- New data updates are validated and go through a PR.
- CI must pass on every PR before merge.
- E2E tests cover the main interaction patterns for modal & hover.

## Daily / Weekly Operations
- Daily: Monitor scheduled data-refresh PRs and act on failures.
- Weekly: Review outstanding `To Do` issues and prioritize for upcoming sprint.

## Contributors & Ownership
- Project owner(s) should triage incoming data issues and tag maintainers.
- Use labels: `To Do`, `In Progress`, `Blocked`, `Done`, `data-update`.

## Metrics & Signals
- Data freshness (hours since last successful sync).
- PR review and merge time for data updates.
- CI pass rate and test coverage.

---

See CONTRIBUTING.md for the workflow to add new data, open issues, and operate the scheduled jobs.
