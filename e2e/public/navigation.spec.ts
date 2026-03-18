import { test, expect } from '@playwright/test'
import { loginAsAdmin } from '../helpers/auth'

test.describe('Navigation', () => {
  test('logo links to home', async ({ page }) => {
    await page.goto('/contato')
    await page.locator('.header__logo').click()
    await page.waitForURL('/')
    await expect(page).toHaveURL('/')
  })

  test('nav links navigate correctly', async ({ page }) => {
    await page.goto('/')

    const headerNav = page.locator('.header__nav-list')

    await headerNav.getByRole('link', { name: 'Serviços' }).click()
    await page.waitForURL('/servicos')
    await expect(page).toHaveURL('/servicos')

    await headerNav.getByRole('link', { name: 'Quem somos' }).click()
    await page.waitForURL('/quem-somos')
    await expect(page).toHaveURL('/quem-somos')

    await headerNav.getByRole('link', { name: 'Contato' }).click()
    await page.waitForURL('/contato')
    await expect(page).toHaveURL('/contato')
  })

  test('SPA navigation does not reload the page', async ({ page }) => {
    await page.goto('/')

    let reloaded = false
    page.on('load', () => {
      reloaded = true
    })

    await page.locator('.header__nav-list').getByRole('link', { name: 'Serviços' }).click()
    await page.waitForURL('/servicos')

    expect(reloaded).toBe(false)
  })

  test('guest sees Entrar and Criar conta buttons', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.header__auth').getByRole('link', { name: 'Entrar' })).toBeVisible()
    await expect(
      page.locator('.header__auth').getByRole('link', { name: 'Criar conta' }),
    ).toBeVisible()
  })

  test('authenticated user sees bell and dropdown instead of auth buttons', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/')

    await expect(page.locator('.notification-bell')).toBeVisible()
    await expect(page.locator('.profile-dropdown')).toBeVisible()
    await expect(page.locator('.header__auth')).not.toBeVisible()
  })

  test('mobile hamburger menu toggles navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const menuButton = page.locator('.header__menu-btn')
    await expect(menuButton).toBeVisible()

    await menuButton.click()
    await expect(page.locator('.header__nav.is-open')).toBeVisible()

    await menuButton.click()
    await expect(page.locator('.header__nav.is-open')).not.toBeVisible()
  })
})
