import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
    test('should successfully log in and log out', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await page.getByRole('link', { name: 'Sign in' }).click();

    await page.getByPlaceholder('Email').fill('whatasigma@mail.eu');
    await page.getByPlaceholder('Password').fill('123qwe');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByRole('navigation')).toContainText('whatasigma@mail.eu');
    await expect(page.getByRole('link', { name: 'Sign out' })).toBeVisible();

    await page.getByRole('link', { name: 'Sign out' }).click();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  });

  test('should try log in and get error', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByPlaceholder('Email').fill('whatasigma@mail.eu');
    await page.getByPlaceholder('Password').fill('123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Something went wrong,check')).toBeVisible();

    await page.getByPlaceholder('Email').fill('whatasigma@mail');
    await page.getByPlaceholder('Password').fill('123qwe');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Something went wrong,check')).toBeVisible();
  });
});
