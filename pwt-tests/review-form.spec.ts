import { test, expect } from '@playwright/test';

test.describe('Review Form', () => {
  test('should try send review without log in', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.reviews');
    expect(page.locator('.reviews__form.form')).toBeHidden();
  });

  test('should successfully send review while logged in', async ({ page }) => {
    const COMMENT = 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.';
    const RATING = 'perfect';

    await page.goto('http://localhost:5173/login');

    await page.getByPlaceholder('Email').fill('whatasigma@mail.eu');
    await page.getByPlaceholder('Password').fill('123qwe');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForSelector('.cities__card');

    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.reviews');
    expect(page.locator('.reviews__form.form')).toBeVisible();

    await page.fill('[name="review"]', COMMENT);
    await page.getByTitle(RATING).click();
    expect(page.locator('button[type="submit"]')).toBeEnabled();

    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/comments') && resp.status() === 201
      ),
      page.click('button[type="submit"]'),
    ]);

    expect(page
      .locator('.reviews__item', {hasText: COMMENT})
      .filter({hasText: 'whatasigma'})
      .first()
    ).toBeVisible();
  });
})
