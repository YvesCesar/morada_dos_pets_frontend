import { test, expect } from '@playwright/test'
import { loginAsAdmin, loginAsCustomer } from '../helpers/auth'

test.describe('Header', () => {
  test('guest: shows Entrar and Criar conta, no bell or dropdown', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.header__auth').getByRole('link', { name: 'Entrar' })).toBeVisible()
    await expect(
      page.locator('.header__auth').getByRole('link', { name: 'Criar conta' }),
    ).toBeVisible()
    await expect(page.locator('.notification-bell')).not.toBeVisible()
    await expect(page.locator('.profile-dropdown')).not.toBeVisible()
  })

  test('admin: shows bell and dropdown with admin menu items', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/')

    await expect(page.locator('.notification-bell')).toBeVisible()
    await expect(page.locator('.profile-dropdown')).toBeVisible()

    await page.locator('.profile-dropdown__trigger').click()

    const menu = page.locator('.profile-dropdown__menu')
    await expect(menu.getByText('Dashboard')).toBeVisible()
    await expect(menu.getByText('Usuários')).toBeVisible()
    await expect(menu.getByText('Cupons')).toBeVisible()
    await expect(menu.getByText('Preços')).toBeVisible()
    await expect(menu.getByText('Depoimentos')).toBeVisible()
  })

  test('customer: shows bell and dropdown with customer menu items', async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/')

    await expect(page.locator('.notification-bell')).toBeVisible()
    await expect(page.locator('.profile-dropdown')).toBeVisible()

    await page.locator('.profile-dropdown__trigger').click()

    const menu = page.locator('.profile-dropdown__menu')
    await expect(menu.getByText('Meu Painel')).toBeVisible()
    await expect(menu.getByText('Perfil')).toBeVisible()
    await expect(menu.getByText('Configurações')).toBeVisible()
  })

  test('clicking dropdown trigger toggles menu', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/')

    await page.locator('.profile-dropdown__trigger').click()
    await expect(page.locator('.profile-dropdown__menu')).toBeVisible()

    await page.locator('.profile-dropdown__trigger').click()
    await expect(page.locator('.profile-dropdown__menu')).not.toBeVisible()
  })

  test('logout: clears auth, redirects home, header shows guest state', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/')

    await page.locator('.profile-dropdown__trigger').click()
    await page.locator('.profile-dropdown__item--logout').click()

    await page.waitForURL('/')
    await expect(page.locator('.header__auth')).toBeVisible()
    await expect(page.locator('.notification-bell')).not.toBeVisible()
  })
})
