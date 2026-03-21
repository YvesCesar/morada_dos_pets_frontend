import { test, expect } from '@playwright/test'
import { loginAsAdmin } from '../helpers/auth'

test.describe('Users Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/usuarios')
  })

  test('table shows existing users', async ({ page }) => {
    await expect(page.locator('.users-table__table')).toBeVisible()
    await expect(page.locator('tr').filter({ hasText: 'Admin Morada' })).toBeVisible()
    await expect(page.locator('tr').filter({ hasText: 'Maria Silva' })).toBeVisible()
  })

  test('add new user via modal', async ({ page }) => {
    await page.locator('.users-view__add-btn').click()

    const modal = page.locator('.user-form')
    await expect(modal).toBeVisible()

    await modal.locator('input[type="text"]').first().fill('Carlos Oliveira')
    await modal.locator('input[type="email"]').fill('carlos@petshop.com')
    await modal.locator('select').selectOption('customer')
    await modal.locator('input[type="text"]').nth(1).pressSequentially('11987654321')
    await modal.locator('input[type="text"]').nth(2).pressSequentially('98765432100')

    await modal.locator('.user-form__btn--save').click()

    await expect(page.locator('tr').filter({ hasText: 'Carlos Oliveira' })).toBeVisible()
  })

  test('edit user via modal', async ({ page }) => {
    const mariaRow = page.locator('tr').filter({ hasText: 'Maria Silva' })
    await mariaRow.locator('button[title="Editar"]').click()

    const modal = page.locator('.user-form')
    await expect(modal).toBeVisible()

    const nameInput = modal.locator('input[type="text"]').first()
    await nameInput.clear()
    await nameInput.fill('Maria Silva Santos')

    await modal.locator('.user-form__btn--save').click()

    await expect(page.locator('tr').filter({ hasText: 'Maria Silva Santos' })).toBeVisible()
  })

  test('delete user via confirm modal', async ({ page }) => {
    const mariaRow = page.locator('tr').filter({ hasText: 'Maria Silva' })
    await mariaRow.locator('button[title="Remover"]').click()

    await expect(page.locator('.confirm-modal')).toBeVisible()
    await page.locator('.confirm-modal__btn--confirm').click()

    await expect(page.locator('tr').filter({ hasText: 'Maria Silva' })).not.toBeVisible()
  })
})
