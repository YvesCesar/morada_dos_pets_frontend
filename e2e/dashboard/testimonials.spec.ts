import { test, expect } from '@playwright/test'
import { loginAsAdmin } from '../helpers/auth'

test.describe('Testimonials Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/depoimentos')
  })

  test('shows testimonials list with author and text', async ({ page }) => {
    await expect(page.getByText('Maria Silva')).toBeVisible()
    await expect(page.getByText(/Serviço excelente/)).toBeVisible()
  })

  test('approve/revoke testimonial toggles status', async ({ page }) => {
    const actionButton = page.locator('.testimonials-table__action-btn').first()
    const initialText = await actionButton.textContent()

    await actionButton.click()

    const updatedText = await actionButton.textContent()
    expect(updatedText).not.toEqual(initialText)
  })
})
