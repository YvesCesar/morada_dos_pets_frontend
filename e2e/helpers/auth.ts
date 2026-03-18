import type { Page } from '@playwright/test'

const STORAGE_KEY = 'morada_auth'

const adminUser = {
  id: 'u1',
  name: 'Admin Morada',
  email: 'admin@admin.com',
  role: 'admin',
  phone: '(11) 99999-0000',
  cpf: '000.000.000-00',
  birthDate: '01/01/1990',
  cep: '01001-000',
  address: 'Rua Admin',
  addressNumber: '100',
  neighborhood: 'Centro',
  photo: '',
  active: true,
  createdAt: '2024-01-01',
}

const customerUser = {
  id: 'u2',
  name: 'Maria Silva',
  email: 'customer@customer.com',
  role: 'customer',
  phone: '(11) 98765-4321',
  cpf: '123.456.789-00',
  birthDate: '15/06/1995',
  cep: '04567-890',
  address: 'Rua das Flores',
  addressNumber: '42',
  neighborhood: 'Jardim Paulista',
  photo: '',
  active: true,
  createdAt: '2024-03-15',
}

export async function loginAsAdmin(page: Page) {
  await page.addInitScript(
    ({ key, user }) => {
      localStorage.setItem(key, JSON.stringify(user))
    },
    { key: STORAGE_KEY, user: adminUser },
  )
}

export async function loginAsCustomer(page: Page) {
  await page.addInitScript(
    ({ key, user }) => {
      localStorage.setItem(key, JSON.stringify(user))
    },
    { key: STORAGE_KEY, user: customerUser },
  )
}

export async function clearAuth(page: Page) {
  await page.addInitScript(
    ({ key }) => {
      localStorage.removeItem(key)
    },
    { key: STORAGE_KEY },
  )
}
