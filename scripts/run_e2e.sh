#!/usr/bin/env bash
set -euo pipefail

echo "Installing Node deps..."
npm ci

echo "Installing Playwright browsers..."
npx playwright install --with-deps

echo "Starting static server and running Playwright tests..."
python3 -m http.server 8000 &
SERVER_PID=$!
sleep 1

npx playwright test --config=playwright.config.js --retries=1

kill ${SERVER_PID} || true
