const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const { test, expect } = require('@playwright/test');

test('modal visual matches baseline', async ({ page }) => {
  await page.goto('/');

  // Try to open a modal — reuse earlier approach
  const card = page.locator('[data-pokemon-card]').first();
  if ((await card.count()) === 0) {
    const alt = page.locator('article, .card, .pokemon-card, .poke-card').first();
    await expect(alt).toBeVisible();
    await alt.click();
  } else {
    await card.click();
  }

  const modal = page.locator('[role="dialog"], .modal, .profile-modal').first();
  await expect(modal).toBeVisible();

  // take a screenshot of the modal region
  const screenshotBuffer = await modal.screenshot({ timeout: 5000 });

  const baselinePath = path.join(__dirname, 'baseline', 'modal-baseline.png');
  const tmpPath = path.join(__dirname, 'baseline', 'modal-latest.png');
  fs.writeFileSync(tmpPath, screenshotBuffer);

  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(tmpPath));

  // If images sizes differ, fail early
  expect(img1.width).toBe(img2.width);
  expect(img1.height).toBe(img2.height);

  const { width, height } = img1;
  const diff = new PNG({ width, height });
  const mismatch = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.15 });

  // write diff for diagnostics if any mismatch
  if (mismatch > 0) {
    fs.writeFileSync(path.join(__dirname, 'baseline', 'modal-diff.png'), PNG.sync.write(diff));
  }

  // allow a small number of differing pixels (tolerate render minor discrepancies)
  expect(mismatch).toBeLessThanOrEqual(50);
});
