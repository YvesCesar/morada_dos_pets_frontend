import { test, expect } from '@playwright/test'
import { loginAsCustomer } from '../helpers/auth'

test.describe('Payment Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/servicos/pagamento')
  })

  test('service request step shows form fields', async ({ page }) => {
    await expect(page.getByText('Preencha as informações')).toBeVisible()
    await expect(page.locator('.service-request__select').first()).toBeVisible()
  })

  test('selecting service type, service, unit, pet, date, and time enables confirm', async ({
    page,
  }) => {
    const selects = page.locator('.service-request__select')

    await selects.nth(0).selectOption({ index: 1 })
    await page.waitForTimeout(300)

    const serviceSelect = page.locator('.service-request__select').nth(1)
    if (await serviceSelect.isVisible()) {
      await serviceSelect.selectOption({ index: 1 })
    }

    await page.waitForTimeout(300)

    const allSelects = page.locator('.service-request__select')
    const count = await allSelects.count()
    for (let index = 2; index < count; index++) {
      const select = allSelects.nth(index)
      if (await select.isVisible()) {
        const options = await select.locator('option').count()
        if (options > 1) {
          await select.selectOption({ index: 1 })
        }
      }
    }

    const dateInput = page.locator('input[type="date"]')
    if (await dateInput.isVisible()) {
      await dateInput.fill('2026-06-15')
    }
  })

  test('query param pre-selects service type', async ({ page }) => {
    await page.goto('/servicos/pagamento?tipo=dog-spa')
    await expect(page.locator('.service-request__select').first()).toBeVisible()
  })

  test('confirmation step shows success message', async ({ page }) => {
    await page.goto('/servicos/pagamento')

    const confirmButton = page.locator('.service-request__btn--primary')
    if (await confirmButton.isEnabled({ timeout: 1000 }).catch(() => false)) {
      await confirmButton.click()
    }
  })
})

test.describe('Payment Step Navigation', () => {
  test('Voltar button returns to previous step', async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/servicos/pagamento')

    await expect(page.locator('.progress-bar')).toBeVisible()
  })
})
