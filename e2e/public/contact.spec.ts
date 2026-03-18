import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contato')
  })

  test('contact form fields are visible', async ({ page }) => {
    await expect(page.locator('#name')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#phone')).toBeVisible()
    await expect(page.locator('#subject')).toBeVisible()
    await expect(page.locator('#message')).toBeVisible()
  })

  test('submit with all fields shows success alert and clears form', async ({ page }) => {
    await page.locator('#name').fill('João Pedro Santos')
    await page.locator('#email').fill('joao.pedro@email.com')
    await page.locator('#phone').fill('(11) 91234-5678')
    await page.locator('#subject').fill('Dúvida sobre banho e tosa')
    await page.locator('#message').fill(
      'Gostaria de saber os horários disponíveis para banho do meu Golden Retriever.',
    )

    page.on('dialog', (dialog) => dialog.accept())

    await page.locator('.contact-form__button').click()

    await expect(page.locator('#name')).toHaveValue('')
    await expect(page.locator('#email')).toHaveValue('')
    await expect(page.locator('#subject')).toHaveValue('')
    await expect(page.locator('#message')).toHaveValue('')
  })

  test('contact information section is visible', async ({ page }) => {
    await expect(page.getByText('Fale conosco')).toBeVisible()
  })
})
