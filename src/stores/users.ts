/**
 * Store de usuários — CRUD para admin
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile } from '@/types'
import { mockUsers } from '@/data'

export const useUsersStore = defineStore('users', () => {
  const users = ref<UserProfile[]>([...mockUsers])

  function addUser(user: Omit<UserProfile, 'id' | 'createdAt'>) {
    const id = 'u' + Date.now()
    const createdAt = new Date().toISOString().split('T')[0] as string
    users.value.push({ ...user, id, createdAt })
  }

  function updateUser(id: string, data: Partial<UserProfile>) {
    const index = users.value.findIndex((u) => u.id === id)
    if (index !== -1) {
      Object.assign(users.value[index]!, data)
    }
  }

  function removeUser(id: string) {
    users.value = users.value.filter((u) => u.id !== id)
  }

  function toggleActive(id: string) {
    const user = users.value.find((u) => u.id === id)
    if (user) user.active = !user.active
  }

  return {
    users,
    addUser,
    updateUser,
    removeUser,
    toggleActive,
  }
})
