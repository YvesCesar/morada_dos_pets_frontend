import { test, expect } from '@playwright/test'

test.describe('Contact Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contato')
  })

  test('submit button is disabled with empty fields', async ({ page }) => {
    await expect(page.locator('.contact-form__button')).toBeDisabled()
  })

  test('invalid email shows error message', async ({ page }) => {
    await page.locator('#email').fill('email-invalido')
    await page.locator('#name').click()

    await expect(page.getByText('E-mail inválido')).toBeVisible()
  })

  test('short message shows minimum length error', async ({ page }) => {
    await page.locator('#message').fill('Curta')
    await page.locator('#name').click()

    await expect(page.getByText('Mensagem deve ter pelo menos 10 caracteres')).toBeVisible()
  })

  test('phone mask formats number correctly', async ({ page }) => {
    await page.locator('#phone').pressSequentially('11912345678')

    await expect(page.locator('#phone')).toHaveValue('(11) 91234-5678')
  })

  test('name with numbers shows error', async ({ page }) => {
    await page.locator('#name').fill('João123')
    await page.locator('#email').click()

    await expect(page.getByText('Nome deve conter apenas letras')).toBeVisible()
  })

  test('subject with HTML tags shows error', async ({ page }) => {
    await page.locator('#subject').fill('Assunto <script>')
    await page.locator('#name').click()

    await expect(page.getByText('Assunto contém caracteres inválidos')).toBeVisible()
  })

  test('valid form submission clears form and shows success', async ({ page }) => {
    await page.locator('#name').fill('João Pedro Santos')
    await page.locator('#email').fill('joao.pedro@email.com')
    await page.locator('#phone').pressSequentially('11912345678')
    await page.locator('#subject').fill('Dúvida sobre banho e tosa')
    await page.locator('#message').fill('Gostaria de saber os horários disponíveis para o meu Golden Retriever.')

    page.on('dialog', (dialog) => dialog.accept())

    await expect(page.locator('.contact-form__button')).toBeEnabled()
    await page.locator('.contact-form__button').click()

    await expect(page.locator('#name')).toHaveValue('')
    await expect(page.locator('#email')).toHaveValue('')
  })
})
