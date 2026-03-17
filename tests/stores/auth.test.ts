import { freshPinia } from '../helpers'
import { useAuthStore } from '@/stores/auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('starts unauthenticated', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  describe('login', () => {
    it('authenticates admin with correct credentials', () => {
      const store = useAuthStore()
      const result = store.login('admin@admin.com', 'admin')
      expect(result).toBe(true)
      expect(store.isAuthenticated).toBe(true)
      expect(store.isAdmin).toBe(true)
      expect(store.role).toBe('admin')
    })

    it('authenticates customer with correct credentials', () => {
      const store = useAuthStore()
      const result = store.login('customer@customer.com', 'customer')
      expect(result).toBe(true)
      expect(store.isCustomer).toBe(true)
      expect(store.role).toBe('customer')
    })

    it('fails with invalid credentials', () => {
      const store = useAuthStore()
      const result = store.login('desconhecido@email.com', 'senhaerrada')
      expect(result).toBe(false)
      expect(store.isAuthenticated).toBe(false)
      expect(store.error).toBe('E-mail ou senha inválidos.')
    })

    it('persists to localStorage', () => {
      const store = useAuthStore()
      store.login('admin@admin.com', 'admin')
      const saved = JSON.parse(localStorage.getItem('morada_auth')!)
      expect(saved.email).toBe('admin@admin.com')
    })
  })

  describe('logout', () => {
    it('clears user and localStorage', () => {
      const store = useAuthStore()
      store.login('admin@admin.com', 'admin')
      store.logout()
      expect(store.user).toBeNull()
      expect(store.isAuthenticated).toBe(false)
      expect(localStorage.getItem('morada_auth')).toBeNull()
    })
  })

  describe('init', () => {
    it('restores user from localStorage', () => {
      const savedAdmin = {
        id: 'u1',
        name: 'Admin Morada',
        email: 'admin@admin.com',
        role: 'admin',
      }
      localStorage.setItem('morada_auth', JSON.stringify(savedAdmin))

      freshPinia()
      const store = useAuthStore()
      expect(store.user?.email).toBe('admin@admin.com')
    })

    it('handles corrupted localStorage gracefully', () => {
      localStorage.setItem('morada_auth', 'json-corrompido{')

      freshPinia()
      const store = useAuthStore()
      expect(store.user).toBeNull()
      expect(localStorage.getItem('morada_auth')).toBeNull()
    })
  })

  describe('updateProfile', () => {
    it('merges partial data into user', () => {
      const store = useAuthStore()
      store.login('admin@admin.com', 'admin')
      store.updateProfile({ name: 'Admin Morada dos Pets' })
      expect(store.user?.name).toBe('Admin Morada dos Pets')
    })

    it('updates localStorage after merge', () => {
      const store = useAuthStore()
      store.login('admin@admin.com', 'admin')
      store.updateProfile({ phone: '(11) 91234-5678' })
      const saved = JSON.parse(localStorage.getItem('morada_auth')!)
      expect(saved.phone).toBe('(11) 91234-5678')
    })

    it('does nothing if not authenticated', () => {
      const store = useAuthStore()
      store.updateProfile({ name: 'Sem Efeito' })
      expect(store.user).toBeNull()
    })
  })
})
