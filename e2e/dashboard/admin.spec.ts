import { test, expect } from '@playwright/test'
import { loginAsAdmin } from '../helpers/auth'

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/admin')
  })

  test('stats section shows key metrics', async ({ page }) => {
    const statsSection = page.locator('.dashboard-stats')
    await expect(statsSection).toBeVisible()

    const cards = statsSection.locator('.dashboard-stats__card')
    await expect(cards).toHaveCount(4)
  })

  test('service cards show appointment counts', async ({ page }) => {
    await expect(page.locator('.admin-service-cards')).toBeVisible()

    const cards = page.locator('.admin-service-cards__card')
    await expect(cards).toHaveCount(3)
  })

  test('appointments table shows rows', async ({ page }) => {
    const table = page.locator('.admin-table__table')
    await expect(table).toBeVisible()

    const rows = table.locator('tbody tr.admin-table__row')
    await expect(rows.first()).toBeVisible()
  })

  test('filter by service works', async ({ page }) => {
    const serviceFilter = page.locator('.dashboard-filter-bar__select').first()
    await serviceFilter.selectOption('Dog Spa')

    const rows = page.locator('.admin-table__row')
    const count = await rows.count()

    for (let index = 0; index < count; index++) {
      await expect(rows.nth(index)).toContainText('Dog Spa')
    }
  })

  test('clicking a row opens appointment detail modal', async ({ page }) => {
    await page.locator('.admin-table__row').first().click()

    await expect(page.getByText('Detalhes do Agendamento')).toBeVisible()
  })

  test('appointment detail modal shows complete info', async ({ page }) => {
    await page.locator('.admin-table__row').first().click()

    const modal = page.locator('.appointment-detail')
    await expect(modal).toBeVisible()
    await expect(modal.locator('.appointment-detail__row')).not.toHaveCount(0)
  })

  test('cancel appointment changes status', async ({ page }) => {
    const firstPendingRow = page
      .locator('.admin-table__row')
      .filter({ hasText: 'pendente' })
      .first()
    await firstPendingRow.click()

    await page.locator('.appointment-detail__cancel-btn').click()

    await expect(page.locator('.confirm-modal')).toBeVisible()
    await page.locator('.confirm-modal__btn--confirm').click()

    await expect(page.locator('.base-modal')).not.toBeVisible()
  })
})
