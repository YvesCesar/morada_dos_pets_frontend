import { test, expect } from '@playwright/test'
import { loginAsCustomer } from '../helpers/auth'

test.describe('Profile', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/dashboard/perfil')
  })

  test('fields are pre-filled with user data', async ({ page }) => {
    const form = page.locator('.profile-form__form')
    await expect(form).toBeVisible()

    const inputs = form.locator('.profile-form__input')
    await expect(inputs.nth(0)).toHaveValue('Maria Silva')
    await expect(inputs.nth(1)).toHaveValue('customer@customer.com')
  })

  test('edit name and save updates profile', async ({ page }) => {
    const nameInput = page.locator('.profile-form__form .profile-form__input').first()
    await nameInput.clear()
    await nameInput.fill('Maria Santos')

    await page.locator('.profile-form__btn').click()

    // Verify the input still has the updated value after save
    await expect(page.locator('.profile-form__form .profile-form__input').first()).toHaveValue(
      'Maria Santos',
    )
  })

  test('phone mask works correctly', async ({ page }) => {
    const form = page.locator('.profile-form__form')
    const phoneInput = form.locator('.profile-form__input').nth(4)
    await phoneInput.click()
    await phoneInput.press('Control+a')
    await phoneInput.pressSequentially('11955551234')

    await expect(phoneInput).toHaveValue('(11) 95555-1234')
  })

  test('CEP mask works correctly', async ({ page }) => {
    const form = page.locator('.profile-form__form')
    const cepInput = form.locator('.profile-form__input').nth(5)
    await cepInput.click()
    await cepInput.press('Control+a')
    await cepInput.pressSequentially('01310100')

    await expect(cepInput).toHaveValue('01310-100')
  })
})
