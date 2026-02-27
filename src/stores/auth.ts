/**
 * Store de autenticação — login/logout mock com persistência em localStorage
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile, UserRole } from '@/types'
import { mockUsers } from '@/data'

const STORAGE_KEY = 'morada_auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)
  const role = computed<UserRole | null>(() => user.value?.role ?? null)
  const isAdmin = computed(() => role.value === 'admin')
  const isCustomer = computed(() => role.value === 'customer')

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        user.value = JSON.parse(saved)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  function login(email: string, password: string): boolean {
    error.value = ''

    if (email === 'admin@admin.com' && password === 'admin') {
      user.value = mockUsers.find((u) => u.email === 'admin@admin.com') ?? null
    } else if (email === 'customer@customer.com' && password === 'customer') {
      user.value = mockUsers.find((u) => u.email === 'customer@customer.com') ?? null
    } else {
      error.value = 'E-mail ou senha inválidos.'
      return false
    }

    if (user.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
    }
    return true
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  function updateProfile(data: Partial<UserProfile>) {
    if (!user.value) return
    Object.assign(user.value, data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  function loginAs(targetUser: UserProfile) {
    user.value = { ...targetUser }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  init()

  return {
    user,
    error,
    isAuthenticated,
    role,
    isAdmin,
    isCustomer,
    login,
    logout,
    updateProfile,
    loginAs,
  }
})
