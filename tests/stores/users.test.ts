import { freshPinia } from '../helpers'
import { useUsersStore } from '@/stores/users'

describe('useUsersStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('initializes with mock users', () => {
    const store = useUsersStore()
    expect(store.users.length).toBeGreaterThan(0)
  })

  it('addUser generates id with "u" prefix and createdAt', () => {
    const store = useUsersStore()
    const before = store.users.length
    store.addUser({
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      role: 'customer',
      phone: '(11) 97654-3210',
      cpf: '987.654.321-00',
      birthDate: '20/09/1988',
      cep: '04510-020',
      address: 'Rua dos Animais',
      addressNumber: '150',
      neighborhood: 'Vila Mariana',
      photo: '',
      active: true,
    })
    expect(store.users.length).toBe(before + 1)
    const added = store.users[store.users.length - 1]!
    expect(added.id).toMatch(/^u\d+$/)
    expect(added.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(added.name).toBe('Carlos Oliveira')
  })

  it('updateUser merges data', () => {
    const store = useUsersStore()
    store.addUser({
      name: 'Fernanda Lima',
      email: 'fernanda.lima@email.com',
      role: 'customer',
      phone: '(21) 99876-5432',
      cpf: '111.222.333-44',
      birthDate: '05/12/1992',
      cep: '22041-080',
      address: 'Av. Atlântica',
      addressNumber: '500',
      neighborhood: 'Copacabana',
      photo: '',
      active: true,
    })
    const user = store.users[store.users.length - 1]!
    store.updateUser(user.id, { phone: '(21) 91234-0000' })
    expect(store.users.find((entry) => entry.id === user.id)?.phone).toBe('(21) 91234-0000')
  })

  it('removeUser removes from array', () => {
    const store = useUsersStore()
    store.addUser({
      name: 'Pedro Souza',
      email: 'pedro.souza@email.com',
      role: 'customer',
      phone: '(31) 98765-1234',
      cpf: '555.666.777-88',
      birthDate: '10/07/1985',
      cep: '30130-000',
      address: 'Rua da Bahia',
      addressNumber: '200',
      neighborhood: 'Centro',
      photo: '',
      active: true,
    })
    const user = store.users[store.users.length - 1]!
    const before = store.users.length
    store.removeUser(user.id)
    expect(store.users.length).toBe(before - 1)
  })

  it('toggleActive flips active flag', () => {
    const store = useUsersStore()
    store.addUser({
      name: 'Juliana Pereira',
      email: 'juliana.pereira@email.com',
      role: 'customer',
      phone: '(41) 99888-7766',
      cpf: '222.333.444-55',
      birthDate: '25/04/1990',
      cep: '80010-010',
      address: 'Rua XV de Novembro',
      addressNumber: '300',
      neighborhood: 'Centro',
      photo: '',
      active: true,
    })
    const user = store.users[store.users.length - 1]!
    expect(user.active).toBe(true)
    store.toggleActive(user.id)
    expect(store.users.find((entry) => entry.id === user.id)?.active).toBe(false)
  })
})
