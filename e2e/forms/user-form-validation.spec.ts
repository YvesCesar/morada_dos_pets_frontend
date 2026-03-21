import { test, expect } from '@playwright/test'
import { loginAsAdmin } from '../helpers/auth'

test.describe('User Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/usuarios')
  })

  test('save button is disabled with empty required fields', async ({ page }) => {
    await page.locator('.users-view__add-btn').click()

    const modal = page.locator('.user-form')
    await expect(modal).toBeVisible()

    await expect(modal.locator('.user-form__btn--save')).toBeDisabled()
  })

  test('invalid email shows error', async ({ page }) => {
    await page.locator('.users-view__add-btn').click()

    const modal = page.locator('.user-form')
    await modal.locator('input[type="email"]').fill('email-invalido')
    await modal.locator('input[type="text"]').first().click()

    await expect(page.getByText('E-mail inválido')).toBeVisible()
  })

  test('phone mask formats number correctly', async ({ page }) => {
    await page.locator('.users-view__add-btn').click()

    const modal = page.locator('.user-form')
    const phoneInput = modal.locator('input[type="text"]').nth(1)
    await phoneInput.pressSequentially('11987654321')

    await expect(phoneInput).toHaveValue('(11) 98765-4321')
  })

  test('CPF mask formats number correctly', async ({ page }) => {
    await page.locator('.users-view__add-btn').click()

    const modal = page.locator('.user-form')
    const cpfInput = modal.locator('input[type="text"]').nth(2)
    await cpfInput.pressSequentially('98765432100')

    await expect(cpfInput).toHaveValue('987.654.321-00')
  })

  test('name with special characters shows error', async ({ page }) => {
    await page.locator('.users-view__add-btn').click()

    const modal = page.locator('.user-form')
    await modal.locator('input[type="text"]').first().fill('Admin#1')
    await modal.locator('input[type="email"]').click()

    await expect(page.getByText('Nome deve conter apenas letras')).toBeVisible()
  })

  test('valid form enables save button', async ({ page }) => {
    await page.locator('.users-view__add-btn').click()

    const modal = page.locator('.user-form')
    await modal.locator('input[type="text"]').first().fill('Carlos Oliveira')
    await modal.locator('input[type="email"]').fill('carlos@petshop.com')
    await modal.locator('select').selectOption('customer')
    await modal.locator('input[type="text"]').nth(1).pressSequentially('11987654321')
    await modal.locator('input[type="text"]').nth(2).pressSequentially('98765432100')

    await expect(modal.locator('.user-form__btn--save')).toBeEnabled()
  })
})
