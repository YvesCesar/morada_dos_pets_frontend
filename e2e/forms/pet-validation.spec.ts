import { test, expect } from '@playwright/test'
import { loginAsCustomer } from '../helpers/auth'

test.describe('Pet Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/dashboard/cliente')
  })

  test('save button is disabled with empty fields', async ({ page }) => {
    await page.locator('.user-pets__add-btn').click()
    await expect(page.getByText('Novo Pet')).toBeVisible()

    await expect(page.locator('.pet-form__btn--save')).toBeDisabled()
  })

  test('date mask formats birth date correctly', async ({ page }) => {
    await page.locator('.user-pets__add-btn').click()

    const dateInput = page.locator('.pet-form__field--date input')
    await dateInput.pressSequentially('10052020')

    await expect(dateInput).toHaveValue('10/05/2020')
  })

  test('pet name with symbols shows error', async ({ page }) => {
    await page.locator('.user-pets__add-btn').click()

    const modal = page.locator('.pet-form')
    await modal.locator('.pet-form__field--name input').fill('Rex@!')
    await modal.locator('.pet-form__field--breed input').click()

    await expect(page.getByText('Nome deve conter apenas letras')).toBeVisible()
  })

  test('breed with numbers shows error', async ({ page }) => {
    await page.locator('.user-pets__add-btn').click()

    const modal = page.locator('.pet-form')
    await modal.locator('.pet-form__field--breed input').fill('Labrador123')
    await modal.locator('.pet-form__field--name input').click()

    await expect(page.getByText('Raça deve conter apenas letras')).toBeVisible()
  })

  test('valid pet form enables save and card appears', async ({ page }) => {
    await page.locator('.user-pets__add-btn').click()

    const modal = page.locator('.pet-form')
    await modal.locator('.pet-form__field--name input').fill('Rex')
    await modal.locator('.pet-form__field--breed input').fill('Pastor Alemão')
    await modal.locator('.pet-form__field--date input').pressSequentially('10052020')
    await modal.locator('.pet-form__field--weight input').fill('30')

    await expect(modal.locator('.pet-form__btn--save')).toBeEnabled()
    await modal.locator('.pet-form__btn--save').click()

    await expect(page.locator('.user-pets__card').filter({ hasText: 'Rex' })).toBeVisible()
  })
})
