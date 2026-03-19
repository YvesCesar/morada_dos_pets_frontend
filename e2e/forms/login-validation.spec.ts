import { test, expect } from '@playwright/test'

test.describe('Login Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/entrar')
  })

  test('submitting empty form shows error for invalid credentials', async ({ page }) => {
    const button = page.locator('.login-card__button--primary')
    await expect(button).toBeDisabled()
  })

  test('email only without password keeps button disabled', async ({ page }) => {
    await page.locator('#email').fill('cliente@petshop.com')

    await expect(page.locator('.login-card__button--primary')).toBeDisabled()
  })

  test('password only without email keeps button disabled', async ({ page }) => {
    await page.locator('#password').fill('senhasegura')

    await expect(page.locator('.login-card__button--primary')).toBeDisabled()
  })

  test('valid credentials enable button and login succeeds', async ({ page }) => {
    await page.locator('#email').fill('admin@admin.com')
    await page.locator('#password').fill('admin')

    const button = page.locator('.login-card__button--primary')
    await expect(button).toBeEnabled()
    await button.click()

    await page.waitForURL('/dashboard/admin')
  })
})
