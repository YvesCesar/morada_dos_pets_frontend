import { test, expect } from '@playwright/test'

test.describe('About Page (Quem Somos)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quem-somos')
  })

  test('hero banner is visible', async ({ page }) => {
    await expect(page.locator('.hero-banner')).toBeVisible()
  })

  test('history section is visible', async ({ page }) => {
    await expect(page.getByText('Nossa história')).toBeVisible()
  })

  test('mission, vision, and values section is visible', async ({ page }) => {
    await expect(page.getByText('Missão')).toBeVisible()
    await expect(page.getByText('Visão')).toBeVisible()
    await expect(page.getByText('Valores')).toBeVisible()
  })

  test('units section is visible', async ({ page }) => {
    await expect(page.getByText('Conheça nossas unidades')).toBeVisible()
  })
})
