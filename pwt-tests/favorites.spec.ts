import { test, expect, Locator } from '@playwright/test';

test.describe('Favorites', () => {
  test('should be sent to login page wgile not logged in', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');

    await page.locator('.place-card__bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173');
    await page.waitForSelector('.cities__card');
    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer');
    await page.locator('.place-card__bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173/favorites');
    await page.waitForURL('http://localhost:5173/login');
  });

  test('should add/remove favorites by click on bookmark', async ({
    page,
  }) => {
    const isFavorite = async (loc: Locator) => (await loc
        .first()
        .evaluate((el) => [...el.classList]))
        .includes('place-card__bookmark-button--active');

    const getFavoritesNumber = async () => Number((await page.locator('.header__favorite-count').textContent()) || '0');

    await page.goto('http://localhost:5173/login');

    await page.getByPlaceholder('Email').fill('whatasigma@mail.eu');
    await page.getByPlaceholder('Password').fill('123qwe');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForSelector('.cities__card');

    const firstCard = () => page.locator('.place-card__bookmark-button').first();
    const wasActive = await isFavorite(firstCard())
    const wasFavorites = await getFavoritesNumber();

    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/favorite') && resp.ok()
      ),
      firstCard().click()
    ]);
    await page.locator('h1.spinner').waitFor({state: 'hidden'});
    const isActive = await isFavorite(firstCard());
    const nowFavorites = await getFavoritesNumber();

    expect(isActive).not.toBe(wasActive);
    expect(Math.abs(nowFavorites - wasFavorites)).toEqual(1);

    await Promise.all([
      page.waitForURL('http://localhost:5173/favorites'),
      page.getByRole('link', { name: 'whatasigma@mail.eu' }).click(),
    ]);

    await page.waitForSelector(`.page__favorites-container`);

    const favoriteCards = await page
      .locator('.favorites__card.place-card')
      .allTextContents();

    expect(favoriteCards.length).toBe(nowFavorites);

    let clicksCount = 0;
    while (clicksCount < nowFavorites) {
      clicksCount++;
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes('/favorite') && resp.status() === 200
        ),
        page.locator('.place-card__bookmark-button').first().click(),
      ]);
    }

    await page.waitForSelector('.favorites--empty');
    expect(await getFavoritesNumber()).toBe(0);
  });
});
