import { test, expect } from '@playwright/test'
import { loginAsCustomer } from '../helpers/auth'

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
  })

  test('settings hub shows links to profile and change password', async ({ page }) => {
    await page.goto('/dashboard/configuracoes')

    await expect(page.locator('.settings__card-title').filter({ hasText: 'Editar Perfil' })).toBeVisible()
    await expect(page.locator('.settings__card-title').filter({ hasText: 'Alterar Senha' })).toBeVisible()
  })

  test('clicking Editar Perfil navigates to /dashboard/perfil', async ({ page }) => {
    await page.goto('/dashboard/configuracoes')
    await page.locator('.settings__card').filter({ hasText: 'Editar Perfil' }).click()
    await page.waitForURL('/dashboard/perfil')
    await expect(page).toHaveURL('/dashboard/perfil')
  })

  test('clicking Alterar Senha navigates to /dashboard/alterar-senha', async ({ page }) => {
    await page.goto('/dashboard/configuracoes')
    await page.locator('.settings__card').filter({ hasText: 'Alterar Senha' }).click()
    await page.waitForURL('/dashboard/alterar-senha')
    await expect(page).toHaveURL('/dashboard/alterar-senha')
  })
})

test.describe('Change Password', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page)
    await page.goto('/dashboard/alterar-senha')
  })

  test('shows password form fields', async ({ page }) => {
    const inputs = page.locator('.password-form__input')
    await expect(inputs).toHaveCount(3)
  })

  test('submit button is disabled when form is invalid', async ({ page }) => {
    await expect(page.locator('.password-form__btn')).toBeDisabled()
  })

  test('short new password shows error state', async ({ page }) => {
    const inputs = page.locator('.password-form__input')
    await inputs.nth(0).fill('customer')
    await inputs.nth(1).fill('12345')
    await inputs.nth(2).fill('12345')

    await expect(page.locator('.password-form__input--error')).toBeVisible()
  })

  test('mismatched passwords show error state', async ({ page }) => {
    const inputs = page.locator('.password-form__input')
    await inputs.nth(0).fill('customer')
    await inputs.nth(1).fill('novasenha123')
    await inputs.nth(2).fill('senhadiferente')

    await expect(page.locator('.password-form__input--error')).toBeVisible()
  })

  test('valid form enables submit and shows success', async ({ page }) => {
    const inputs = page.locator('.password-form__input')
    await inputs.nth(0).fill('customer')
    await inputs.nth(1).fill('novasenha123')
    await inputs.nth(2).fill('novasenha123')

    const submitButton = page.locator('.password-form__btn')
    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    await expect(page.getByText('Senha alterada com sucesso!')).toBeVisible()
  })
})
