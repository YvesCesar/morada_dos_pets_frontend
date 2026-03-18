import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hero section with CTA is visible', async ({ page }) => {
    await expect(page.locator('.hero')).toBeVisible()
    await expect(page.getByText('Onde a diversão e o')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Saiba mais' })).toBeVisible()
  })

  test('services section shows service cards', async ({ page }) => {
    await expect(page.getByText('Nossos serviços')).toBeVisible()
    await expect(page.locator('.services-cards__card')).toHaveCount(3)
  })

  test('features/benefits section is visible', async ({ page }) => {
    await expect(page.locator('.features')).toBeVisible()
  })

  test('clicking a service card navigates to the service page', async ({ page }) => {
    const dogSpaCard = page.locator('.services-cards__card').first()
    await dogSpaCard.hover()
    await dogSpaCard.locator('.services-cards__hover-btn').click()

    await page.waitForURL(/\/servicos\//)
  })
})
