const { test, expect } = require('@playwright/test');

test.describe('UI smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('index loads and has card grid', async ({ page }) => {
    // check the main grid exists
    const grid = page.locator('main, .grid, .cards, .pokemon-grid');
    await expect(grid.first()).toBeVisible();
  });

  test('opening a card shows modal', async ({ page }) => {
    // find the first clickable card; sample selectors for demo UI
    const card = page.locator('[data-pokemon-card]').first();
    // if not found, try an image card
    if (!(await card.count())) {
      const imgCard = page.locator('article, .card, .pokemon-card, .poke-card').first();
      await expect(imgCard).toBeVisible();
      await imgCard.click();
      const modal = page.locator('[role="dialog"], .modal, .profile-modal');
      await expect(modal.first()).toBeVisible();
      return;
    }

    await card.click();
    const modal = page.locator('[role="dialog"], .modal, .profile-modal');
    await expect(modal.first()).toBeVisible();
  });
});
