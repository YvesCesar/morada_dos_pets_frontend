import { test, expect } from '@playwright/test'

test.describe('Newsletter Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('submit button is disabled with empty email', async ({ page }) => {
    await expect(page.locator('.newsletter__btn')).toBeDisabled()
  })

  test('invalid email keeps button disabled and shows error', async ({ page }) => {
    await page.locator('.newsletter__input').fill('email-invalido')
    await page.locator('.newsletter__input').blur()

    await expect(page.locator('.newsletter__btn')).toBeDisabled()
  })

  test('valid email enables button and clears form on submit', async ({ page }) => {
    await page.locator('.newsletter__input').fill('cliente@petshop.com')

    await expect(page.locator('.newsletter__btn')).toBeEnabled()
    await page.locator('.newsletter__btn').click()

    await expect(page.locator('.newsletter__input')).toHaveValue('')
  })
})
