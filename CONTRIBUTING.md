# Contributing to Pokemon-Go-Stats

Thanks for helping improve Pokemon-Go-Stats. This guide helps you add data, contribute code, and navigate the project's automation.

## How we operate
- All changes go through pull requests and must run CI (lint, tests, accessibility checks).
- Data changes are automated by a scheduled job; manual data updates should use the `data-update` issue template.

## Opening issues
- Use the right issue template (bug, feature, data-update, project-task).
- Add relevant labels, and include steps to reproduce or expected data attributes for data updates.

## Working on data updates
1. Create an issue using the `Data Update` template.
2. A maintainer will triage; if it requires manual edits, create a branch off `main`, edit `data/` JSON files and create a PR.
3. The PR should include tests where relevant, and pass CI before merging.

Automated data refresh: we run a scheduled action that fetches authoritative PokeAPI data and opens a PR. Maintainership must review and merge.

## Development & testing
- Run the static demo with `python3 -m http.server` and open http://localhost:8000.
- Unit tests and linting are configured in `./github/workflows/ci.yml` — run them locally or in CI before opening PRs.

## Community
- Be respectful and follow the code of conduct in `CODE_OF_CONDUCT.md` (if present). If not, follow standard open-source etiquette: review, collaborate, and iterate.

## Questions
If something isn't clear, open an issue titled "Help: *<short description>*" and we'll triage.
