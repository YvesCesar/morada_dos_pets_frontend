import { test, expect } from '@playwright/test'

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/entrar')
  })

  test('shows email and password fields and login button', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('.login-card__button--primary')).toBeVisible()
  })

  test('login button is disabled with empty fields', async ({ page }) => {
    const button = page.locator('.login-card__button--primary')
    await expect(button).toBeDisabled()
  })

  test('shows error with invalid credentials', async ({ page }) => {
    await page.locator('#email').fill('wrong@email.com')
    await page.locator('#password').fill('wrongpassword')
    await page.locator('.login-card__button--primary').click()

    await expect(page.getByText('E-mail ou senha inválidos.')).toBeVisible()
  })

  test('admin login redirects to /dashboard/admin', async ({ page }) => {
    await page.locator('#email').fill('admin@admin.com')
    await page.locator('#password').fill('admin')
    await page.locator('.login-card__button--primary').click()

    await page.waitForURL('/dashboard/admin')
    await expect(page).toHaveURL('/dashboard/admin')
  })

  test('customer login redirects to /dashboard/cliente', async ({ page }) => {
    await page.locator('#email').fill('customer@customer.com')
    await page.locator('#password').fill('customer')
    await page.locator('.login-card__button--primary').click()

    await page.waitForURL('/dashboard/cliente')
    await expect(page).toHaveURL('/dashboard/cliente')
  })

  test('show password checkbox toggles input type', async ({ page }) => {
    const passwordInput = page.locator('#password')
    await expect(passwordInput).toHaveAttribute('type', 'password')

    await page.locator('#show-password').check()
    await expect(passwordInput).toHaveAttribute('type', 'text')

    await page.locator('#show-password').uncheck()
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('"Crie uma conta" link navigates to /cadastro', async ({ page }) => {
    await page.getByRole('link', { name: 'Crie uma conta' }).click()
    await page.waitForURL('/cadastro')
    await expect(page).toHaveURL('/cadastro')
  })
})
