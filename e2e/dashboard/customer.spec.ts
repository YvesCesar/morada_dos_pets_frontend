import { test, expect } from '@playwright/test'
import { loginAsCustomer } from '../helpers/auth'

test.describe('Customer Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/dashboard/cliente')
  })

  test('shows greeting with first name', async ({ page }) => {
    await expect(page.getByText('Olá, Maria!')).toBeVisible()
  })

  test('stats section shows customer metrics', async ({ page }) => {
    const statsSection = page.locator('.dashboard-stats')
    await expect(statsSection).toBeVisible()

    const cards = statsSection.locator('.dashboard-stats__card')
    await expect(cards).toHaveCount(4)
  })

  test('pet cards are visible', async ({ page }) => {
    await expect(page.locator('.user-pets__title')).toBeVisible()

    await expect(page.locator('.user-pets__card').filter({ hasText: 'Thor' })).toBeVisible()
    await expect(page.locator('.user-pets__card').filter({ hasText: 'Luna' })).toBeVisible()
    await expect(page.locator('.user-pets__card').filter({ hasText: 'Mel' })).toBeVisible()
  })

  test('add pet: modal opens, fills form, saves, card appears', async ({ page }) => {
    await page.locator('.user-pets__add-btn').click()

    await expect(page.getByText('Novo Pet')).toBeVisible()

    const modal = page.locator('.pet-form')
    await modal.locator('.pet-form__field--name input').fill('Rex')
    await modal.locator('.pet-form__field--breed input').fill('Pastor Alemão')
    await modal.locator('.pet-form__field--date input').pressSequentially('10052020')
    await modal.locator('.pet-form__field--weight input').fill('30')

    await modal.locator('.pet-form__btn--save').click()

    await expect(page.locator('.user-pets__card').filter({ hasText: 'Rex' })).toBeVisible()
  })

  test('edit pet: click edit, modal shows data, save updates', async ({ page }) => {
    const thorCard = page.locator('.user-pets__card').filter({ hasText: 'Thor' })
    await thorCard.locator('button[title="Editar"]').click()

    await expect(page.getByText('Editar Pet')).toBeVisible()

    const nameInput = page.locator('.pet-form .pet-form__field--name input')
    await nameInput.clear()
    await nameInput.fill('Thor Junior')

    await page.locator('.pet-form__btn--save').click()

    await expect(page.locator('.user-pets__card').filter({ hasText: 'Thor Junior' })).toBeVisible()
  })

  test('delete pet: click delete, confirm modal, card removed', async ({ page }) => {
    const melCard = page.locator('.user-pets__card').filter({ hasText: 'Mel' })
    await melCard.locator('button[title="Remover"]').click()

    await expect(page.locator('.confirm-modal')).toBeVisible()
    await page.locator('.confirm-modal__btn--confirm').click()

    await expect(page.locator('.user-pets__card').filter({ hasText: 'Mel' })).not.toBeVisible()
  })

  test('testimonial section is visible', async ({ page }) => {
    await expect(page.locator('.customer-testimonial__title')).toBeVisible()
  })

  test('appointments section with filter is visible', async ({ page }) => {
    await expect(page.locator('.user-appointments__title')).toBeVisible()
    await expect(page.locator('.dashboard-filter-bar')).toBeVisible()
  })
})
