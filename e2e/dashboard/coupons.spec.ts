import { test, expect } from '@playwright/test'
import { loginAsAdmin } from '../helpers/auth'

test.describe('Coupons Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/cupons')
  })

  test('table shows existing coupons', async ({ page }) => {
    await expect(page.getByText('MORADA10')).toBeVisible()
    await expect(page.getByText('BEMVINDO20')).toBeVisible()
    await expect(page.getByText('DESCONTO30')).toBeVisible()
  })

  test('add new coupon: modal opens, fill form, save, appears in table', async ({ page }) => {
    await page.locator('.coupons-view__add-btn').click()

    const modal = page.locator('.coupon-form')
    await expect(modal).toBeVisible()

    await modal.locator('input[type="text"]').first().fill('PETFELIZ15')
    await modal.locator('select').first().selectOption('percentage')
    await modal.locator('input[type="number"]').first().fill('15')
    await modal.locator('input[type="number"]').nth(1).fill('50')
    await modal.locator('input[type="date"]').fill('2026-12-31')
    await modal.locator('#coupon-active').check()

    await modal.locator('.coupon-form__btn--save').click()

    await expect(page.getByText('PETFELIZ15')).toBeVisible()
  })

  test('edit coupon: modal shows pre-filled data, save updates table', async ({ page }) => {
    const morada10Row = page.locator('tr').filter({ hasText: 'MORADA10' })
    await morada10Row.locator('button[title="Editar"]').click()

    const modal = page.locator('.coupon-form')
    await expect(modal).toBeVisible()

    const valueInput = modal.locator('input[type="number"]').first()
    await valueInput.clear()
    await valueInput.fill('25')

    await modal.locator('.coupon-form__btn--save').click()

    await expect(page.getByText('25%')).toBeVisible()
  })

  test('delete coupon: confirm modal, removed from table', async ({ page }) => {
    const desconto30Row = page.locator('tr').filter({ hasText: 'DESCONTO30' })
    await desconto30Row.locator('button[title="Remover"]').click()

    await expect(page.locator('.confirm-modal')).toBeVisible()
    await page.locator('.confirm-modal__btn--confirm').click()

    await expect(page.getByText('DESCONTO30')).not.toBeVisible()
  })
})
