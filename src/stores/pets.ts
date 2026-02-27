/**
 * Store de pets do customer — CRUD client-side
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardPet } from '@/types'
import { mockDashboardPets } from '@/data'

export const usePetsStore = defineStore('pets', () => {
  const pets = ref<DashboardPet[]>([...mockDashboardPets])

  function getByOwner(ownerId: string) {
    return pets.value.filter((p) => p.ownerId === ownerId)
  }

  function addPet(pet: Omit<DashboardPet, 'id'>) {
    const id = 'p' + Date.now()
    pets.value.push({ ...pet, id })
  }

  function updatePet(id: string, data: Partial<DashboardPet>) {
    const index = pets.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      Object.assign(pets.value[index]!, data)
    }
  }

  function removePet(id: string) {
    pets.value = pets.value.filter((p) => p.id !== id)
  }

  return {
    pets,
    getByOwner,
    addPet,
    updatePet,
    removePet,
  }
})
