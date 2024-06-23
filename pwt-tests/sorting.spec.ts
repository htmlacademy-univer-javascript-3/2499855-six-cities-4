import { test, expect } from '@playwright/test';

test.describe('Sorting Change', () => {
  test('should change sorting by price ASC/DESC', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.places__sorting').click();
    await page.getByText('Price: low to high').click();
    let i = 0;
    (await page.locator('.place-card__price-value').all()).forEach(async (loc) => {
      const price = Number((await loc.textContent())?.substring(1));
      expect(price).toBeGreaterThanOrEqual(i);
      i = price;
    });

    await page.locator('.places__sorting').click();
    await page.getByText('Price: high to low').click();
    (await page.locator('.place-card__price-value').all()).forEach(async (loc) => {
      const price = Number((await loc.textContent())?.substring(1));
      expect(price).toBeLessThanOrEqual(i);
      i = price;
    });
  });
})
