import { freshPinia } from '../helpers'
import { usePetsStore } from '@/stores/pets'

describe('usePetsStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('initializes with mock pets', () => {
    const store = usePetsStore()
    expect(store.pets.length).toBeGreaterThan(0)
  })

  it('getByOwner filters by ownerId', () => {
    const store = usePetsStore()
    const customerPets = store.getByOwner('u2')
    expect(customerPets.length).toBe(3)
    expect(customerPets.every((pet) => pet.ownerId === 'u2')).toBe(true)
  })

  it('getByOwner returns empty for unknown owner', () => {
    const store = usePetsStore()
    expect(store.getByOwner('dono-inexistente')).toEqual([])
  })

  it('addPet generates id with "p" prefix', () => {
    const store = usePetsStore()
    const before = store.pets.length
    store.addPet({
      ownerId: 'u2',
      name: 'Rex',
      breed: 'Labrador Retriever',
      birthDate: '10/05/2022',
      weight: 28,
      photo: '',
    })
    expect(store.pets.length).toBe(before + 1)
    const added = store.pets[store.pets.length - 1]!
    expect(added.id).toMatch(/^p\d+$/)
    expect(added.name).toBe('Rex')
    expect(added.breed).toBe('Labrador Retriever')
  })

  it('updatePet merges data', () => {
    const store = usePetsStore()
    store.addPet({
      ownerId: 'u2',
      name: 'Bob',
      breed: 'Shih Tzu',
      birthDate: '15/03/2021',
      weight: 6,
      photo: '',
    })
    const pet = store.pets[store.pets.length - 1]!
    store.updatePet(pet.id, { weight: 7, name: 'Bobby' })
    const updated = store.pets.find((entry) => entry.id === pet.id)!
    expect(updated.name).toBe('Bobby')
    expect(updated.weight).toBe(7)
  })

  it('removePet removes from array', () => {
    const store = usePetsStore()
    store.addPet({
      ownerId: 'u2',
      name: 'Bolinha',
      breed: 'Vira-lata',
      birthDate: '01/01/2023',
      weight: 8,
      photo: '',
    })
    const pet = store.pets[store.pets.length - 1]!
    const before = store.pets.length
    store.removePet(pet.id)
    expect(store.pets.length).toBe(before - 1)
    expect(store.pets.find((entry) => entry.id === pet.id)).toBeUndefined()
  })
})
