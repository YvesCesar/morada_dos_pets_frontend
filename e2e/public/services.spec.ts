import { test, expect } from '@playwright/test'

test.describe('Services Pages', () => {
  test('/servicos shows hero banner and service cards', async ({ page }) => {
    await page.goto('/servicos')
    await expect(page.locator('.hero-banner-servicos')).toBeVisible()
  })

  test('/servicos/dog-spa shows hero and pricing cards', async ({ page }) => {
    await page.goto('/servicos/dog-spa')
    await expect(page.locator('.hero-banner-dog-spa')).toBeVisible()
    await expect(page.locator('.dog-spa-services__card').first()).toBeVisible()
  })

  test('/servicos/hospedagem tab switching shows different content', async ({ page }) => {
    await page.goto('/servicos/hospedagem')

    const hospedagemTab = page.getByRole('tab', { name: 'Hospedagem' })
    const crecheTab = page.getByRole('tab', { name: 'Creche' })

    await expect(hospedagemTab).toBeVisible()
    await expect(crecheTab).toBeVisible()

    await hospedagemTab.click()
    await expect(page.locator('.hospedagem-pricing')).toBeVisible()

    await crecheTab.click()
    await expect(page.locator('.creche-pricing')).toBeVisible()
  })

  test('/servicos/dog-taxi shows hero and description', async ({ page }) => {
    await page.goto('/servicos/dog-taxi')
    await expect(page.locator('.hero-banner-dog-taxi')).toBeVisible()
  })

  test('Solicitar buttons link to pagamento', async ({ page }) => {
    await page.goto('/servicos/dog-spa')
    const solicitarButton = page.getByRole('button', { name: 'Solicitar' }).first()
    await expect(solicitarButton).toBeVisible()
  })
})
