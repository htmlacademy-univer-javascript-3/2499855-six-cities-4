import { test, expect } from '@playwright/test';

test.describe('Card Fetching', () => {
  test('should fetch offers and render offer cards', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('.cities__places')).toHaveCount(0);
    await page.waitForResponse((resp) => resp.url().includes('/offers'));
    await expect(page.locator('.cities__places')).toHaveCount(1);
  });
})
