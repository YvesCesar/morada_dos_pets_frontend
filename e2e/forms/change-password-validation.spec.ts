import { test, expect } from '@playwright/test'
import { loginAsCustomer } from '../helpers/auth'

test.describe('Change Password Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/dashboard/alterar-senha')
  })

  test('submit button is disabled when form is empty', async ({ page }) => {
    await expect(page.locator('.password-form__btn')).toBeDisabled()
  })

  test('short new password shows minimum length error', async ({ page }) => {
    const inputs = page.locator('.password-form__input')
    await inputs.nth(0).fill('customer')
    await inputs.nth(1).fill('12345')
    await inputs.nth(2).click()

    await expect(page.getByText('Mínimo 6 caracteres')).toBeVisible()
    await expect(page.locator('.password-form__input--error')).toBeVisible()
  })

  test('mismatched passwords keep button disabled and show error', async ({ page }) => {
    const inputs = page.locator('.password-form__input')
    await inputs.nth(0).fill('customer')
    await inputs.nth(1).fill('novasenha123')
    await inputs.nth(2).fill('senhadiferente')

    await expect(page.locator('.password-form__btn')).toBeDisabled()
    await expect(page.locator('.password-form__input--error')).toBeVisible()
  })

  test('valid form shows success message', async ({ page }) => {
    const inputs = page.locator('.password-form__input')
    await inputs.nth(0).fill('customer')
    await inputs.nth(1).fill('novasenha123')
    await inputs.nth(2).fill('novasenha123')

    await page.locator('.password-form__btn').click()

    await expect(page.getByText('Senha alterada com sucesso!')).toBeVisible()
  })
})
