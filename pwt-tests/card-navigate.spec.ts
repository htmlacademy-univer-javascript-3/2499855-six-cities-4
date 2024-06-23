import { test, expect } from '@playwright/test';

test.describe('Card Navigate', () => {
  test('should click on card and navigate to card page', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');

    const firstCardName = await page.locator('.place-card__name').first().textContent();
    const firstCardPrice = await page.locator('.place-card__price-value').first().textContent();
    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer');
    const cardDetailsName = await page.locator('.offer__name').textContent();
    const cardDetailsPrice = await page.locator('.offer__price-value').textContent();

    expect(cardDetailsName).toBe(firstCardName);
    expect(cardDetailsPrice).toBe(firstCardPrice);
  });
})
