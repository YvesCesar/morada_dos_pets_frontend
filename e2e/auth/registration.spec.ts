import { test, expect } from '@playwright/test'

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cadastro')
  })

  test('step 1 shows email, password, and confirm password fields', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('#confirm-password')).toBeVisible()
    await expect(page.getByText('Etapa 1 de 2')).toBeVisible()
  })

  test('password shorter than 6 characters shows error class', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('12345')
    await page.locator('#confirm-password').click()

    await expect(page.locator('#password')).toHaveClass(/register-card__input--error/)
  })

  test('mismatched passwords show error class', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhadiferente456')

    await expect(page.locator('#confirm-password')).toHaveClass(/register-card__input--error/)
  })

  test('valid step 1 advances to step 2', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()

    await expect(page.getByText('Etapa 2 de 2')).toBeVisible()
  })

  test('step 2 shows personal data and contact fields', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()

    await expect(page.locator('#nome')).toBeVisible()
    await expect(page.locator('#dataNascimento')).toBeVisible()
    await expect(page.locator('#cpf')).toBeVisible()
    await expect(page.locator('#celular')).toBeVisible()
    await expect(page.locator('#cep')).toBeVisible()
    await expect(page.locator('#endereco')).toBeVisible()
    await expect(page.locator('#numero')).toBeVisible()
    await expect(page.locator('#bairro')).toBeVisible()
  })

  test('input masks work correctly with pressSequentially', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()

    await page.locator('#dataNascimento').pressSequentially('15061995')
    await expect(page.locator('#dataNascimento')).toHaveValue('15/06/1995')

    await page.locator('#cpf').pressSequentially('12345678900')
    await expect(page.locator('#cpf')).toHaveValue('123.456.789-00')

    await page.locator('#celular').pressSequentially('11987654321')
    await expect(page.locator('#celular')).toHaveValue('(11) 98765-4321')

    await page.locator('#cep').pressSequentially('04567890')
    await expect(page.locator('#cep')).toHaveValue('04567-890')
  })
})
