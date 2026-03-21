import { test, expect } from '@playwright/test'
import { loginAsCustomer } from '../helpers/auth'

test.describe('Profile Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/dashboard/perfil')
  })

  test('phone mask formats number correctly', async ({ page }) => {
    const form = page.locator('.profile-form__form')
    const phoneInput = form.locator('.profile-form__input').nth(4)
    await phoneInput.click()
    await phoneInput.press('Control+a')
    await phoneInput.pressSequentially('11955551234')

    await expect(phoneInput).toHaveValue('(11) 95555-1234')
  })

  test('CEP mask formats number correctly', async ({ page }) => {
    const form = page.locator('.profile-form__form')
    const cepInput = form.locator('.profile-form__input').nth(5)
    await cepInput.click()
    await cepInput.press('Control+a')
    await cepInput.pressSequentially('01310100')

    await expect(cepInput).toHaveValue('01310-100')
  })

  test('name with numbers shows error', async ({ page }) => {
    const nameInput = page.locator('.profile-form__form .profile-form__input').first()
    await nameInput.clear()
    await nameInput.fill('Carlos123')
    await page.locator('.profile-form__form .profile-form__input').nth(1).click()

    await expect(page.getByText('Nome deve conter apenas letras')).toBeVisible()
  })

  test('address number with only letters shows error', async ({ page }) => {
    const form = page.locator('.profile-form__form')
    const addressNumberInput = form.locator('.profile-form__input').nth(7)
    await addressNumberInput.clear()
    await addressNumberInput.fill('abc')
    await form.locator('.profile-form__input').nth(6).click()

    await expect(page.getByText('Número deve conter apenas dígitos e opcionalmente uma letra')).toBeVisible()
  })

  test('valid form saves successfully', async ({ page }) => {
    const nameInput = page.locator('.profile-form__form .profile-form__input').first()
    await nameInput.clear()
    await nameInput.fill('Maria Santos')

    await page.locator('.profile-form__btn').click()

    await expect(page.locator('.profile-form__form .profile-form__input').first()).toHaveValue(
      'Maria Santos',
    )
  })
})
