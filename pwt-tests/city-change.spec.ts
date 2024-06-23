import { test, expect } from '@playwright/test';

test.describe('City Change', () => {
  test('should change city and rerender offer cards', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const cardsParis = page.locator('.cities__places')
    await expect(cardsParis).toHaveCount(1);
    await page.getByRole('link', { name: 'Hamburg' }).click();

    const cardsHamburg = page.locator('.cities__places');
    await expect(cardsHamburg).toHaveCount(1);
    expect(cardsParis).not.toBe(cardsHamburg);
  });
})
