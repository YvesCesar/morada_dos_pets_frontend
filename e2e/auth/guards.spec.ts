import { test, expect } from '@playwright/test'
import { loginAsAdmin, loginAsCustomer } from '../helpers/auth'

test.describe('Route Guards', () => {
  test('guest accessing /dashboard/admin is redirected to /entrar', async ({ page }) => {
    await page.goto('/dashboard/admin')
    await page.waitForURL('/entrar')
    await expect(page).toHaveURL('/entrar')
  })

  test('guest accessing /dashboard/cliente is redirected to /entrar', async ({ page }) => {
    await page.goto('/dashboard/cliente')
    await page.waitForURL('/entrar')
    await expect(page).toHaveURL('/entrar')
  })

  test('guest accessing /dashboard/perfil is redirected to /entrar', async ({ page }) => {
    await page.goto('/dashboard/perfil')
    await page.waitForURL('/entrar')
    await expect(page).toHaveURL('/entrar')
  })

  test('admin accessing /entrar is redirected to /dashboard/admin', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/entrar')
    await page.waitForURL('/dashboard/admin')
    await expect(page).toHaveURL('/dashboard/admin')
  })

  test('customer accessing /entrar is redirected to /dashboard/cliente', async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/entrar')
    await page.waitForURL('/dashboard/cliente')
    await expect(page).toHaveURL('/dashboard/cliente')
  })

  test('admin accessing /cadastro is redirected to /dashboard/admin', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/cadastro')
    await page.waitForURL('/dashboard/admin')
    await expect(page).toHaveURL('/dashboard/admin')
  })

  test('customer accessing /dashboard/admin is redirected to /dashboard/cliente', async ({
    page,
  }) => {
    await loginAsCustomer(page)
    await page.goto('/dashboard/admin')
    await page.waitForURL('/dashboard/cliente')
    await expect(page).toHaveURL('/dashboard/cliente')
  })

  test('admin accessing /dashboard/cliente is redirected to /dashboard/admin', async ({ page }) => {
    await loginAsAdmin(page)
    await page.goto('/dashboard/cliente')
    await page.waitForURL('/dashboard/admin')
    await expect(page).toHaveURL('/dashboard/admin')
  })
})
