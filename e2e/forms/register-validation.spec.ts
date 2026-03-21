import { test, expect } from '@playwright/test'

test.describe('Registration Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cadastro')
  })

  test('step 1: password shorter than 6 characters shows error class', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('12345')
    await page.locator('#confirm-password').click()

    await expect(page.locator('#password')).toHaveClass(/register-card__input--error/)
  })

  test('step 1: mismatched passwords show error class on confirm field', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhadiferente456')

    await expect(page.locator('#confirm-password')).toHaveClass(/register-card__input--error/)
  })

  test('step 2: input masks format date, CPF, phone, and CEP', async ({ page }) => {
    // Advance to step 2
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()
    await expect(page.getByText('Etapa 2 de 2')).toBeVisible()

    // Date mask: 15061995 → 15/06/1995
    await page.locator('#dataNascimento').pressSequentially('15061995')
    await expect(page.locator('#dataNascimento')).toHaveValue('15/06/1995')

    // CPF mask: 12345678900 → 123.456.789-00
    await page.locator('#cpf').pressSequentially('12345678900')
    await expect(page.locator('#cpf')).toHaveValue('123.456.789-00')

    // Phone mask: 11987654321 → (11) 98765-4321
    await page.locator('#celular').pressSequentially('11987654321')
    await expect(page.locator('#celular')).toHaveValue('(11) 98765-4321')

    // CEP mask: 04567890 → 04567-890
    await page.locator('#cep').pressSequentially('04567890')
    await expect(page.locator('#cep')).toHaveValue('04567-890')
  })

  test('step 2: name with special characters shows error', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()
    await expect(page.getByText('Etapa 2 de 2')).toBeVisible()

    await page.locator('#nome').fill('Maria@Silva')
    await page.locator('#endereco').click()

    await expect(page.getByText('Nome deve conter apenas letras')).toBeVisible()
  })

  test('step 2: address number with only letters shows error', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()
    await expect(page.getByText('Etapa 2 de 2')).toBeVisible()

    await page.locator('#numero').fill('abc')
    await page.locator('#endereco').click()

    await expect(page.getByText('Número deve conter apenas dígitos e opcionalmente uma letra')).toBeVisible()
  })

  test('step 2: name with accents is accepted', async ({ page }) => {
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()
    await expect(page.getByText('Etapa 2 de 2')).toBeVisible()

    await page.locator('#nome').fill('João da Conceição')
    await page.locator('#endereco').click()

    await expect(page.getByText('Nome deve conter apenas letras')).not.toBeVisible()
  })

  test('step 1: submit button is disabled with empty fields', async ({ page }) => {
    await expect(page.locator('.register-card__button--primary')).toBeDisabled()
  })

  test('step 2: submit button is disabled until all fields are valid', async ({ page }) => {
    // Advance to step 2
    await page.locator('#email').fill('novocliente@petshop.com')
    await page.locator('#password').fill('senhasegura123')
    await page.locator('#confirm-password').fill('senhasegura123')
    await page.locator('.register-card__button--primary').click()

    // Button starts disabled
    await expect(page.locator('.register-card__button--primary')).toBeDisabled()

    // Fill all step 2 fields
    await page.locator('#nome').fill('João Pedro Santos')
    await page.locator('#dataNascimento').pressSequentially('15061995')
    await page.locator('#cpf').pressSequentially('12345678900')
    await page.locator('#celular').pressSequentially('11987654321')
    await page.locator('#cep').pressSequentially('04567890')
    await page.locator('#endereco').fill('Rua das Flores')
    await page.locator('#numero').fill('42')
    await page.locator('#bairro').fill('Jardim Paulista')

    await expect(page.locator('.register-card__button--primary')).toBeEnabled()
  })
})
