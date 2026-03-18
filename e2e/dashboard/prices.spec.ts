import { test, expect } from '@playwright/test'
import { loginAsAdmin } from '../helpers/auth'

test.describe('Prices Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/precos')
  })

  test('shows tabs for Dog Spa, Hospedagem, Creche', async ({ page }) => {
    await expect(page.locator('.prices-editor__tab').filter({ hasText: 'Dog Spa' })).toBeVisible()
    await expect(
      page.locator('.prices-editor__tab').filter({ hasText: 'Hospedagem' }),
    ).toBeVisible()
    await expect(page.locator('.prices-editor__tab').filter({ hasText: 'Creche' })).toBeVisible()
  })

  test('switching tabs shows different prices', async ({ page }) => {
    const content = page.locator('.prices-editor__content')
    const dogSpaText = await content.textContent()

    await page.locator('.prices-editor__tab').filter({ hasText: 'Hospedagem' }).click()
    const hospedagemText = await content.textContent()

    expect(dogSpaText).not.toEqual(hospedagemText)
  })

  test('edit price and save shows success message', async ({ page }) => {
    const priceInput = page.locator('.prices-editor__input').first()
    const originalValue = await priceInput.inputValue()

    await priceInput.clear()
    await priceInput.fill('999,90')

    await page.locator('.prices-editor__btn--save').click()

    await expect(page.getByText('Preços salvos com sucesso!')).toBeVisible()

    // Restore original value
    await priceInput.clear()
    await priceInput.fill(originalValue)
    await page.locator('.prices-editor__btn--save').click()
  })
})
