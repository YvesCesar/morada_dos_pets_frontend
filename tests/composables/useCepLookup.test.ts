import { ref } from 'vue'
import { useCepLookup } from '@/composables/useCepLookup'

describe('useCepLookup', () => {
  it('calls setAddressFields when API returns valid data', async () => {
    const mockResponse = {
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      erro: false,
    }

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    })

    const address = ref('')
    const neighborhood = ref('')

    const { lookupCep } = useCepLookup((addr, neigh) => {
      address.value = addr
      neighborhood.value = neigh
    })

    await lookupCep('01001000')

    expect(address.value).toBe('Praça da Sé')
    expect(neighborhood.value).toBe('Sé')
    expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/')
  })

  it('does not call setAddressFields when API returns erro', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ erro: true }),
    })

    const address = ref('Rua Original')
    const neighborhood = ref('Bairro Original')

    const { lookupCep } = useCepLookup((addr, neigh) => {
      address.value = addr
      neighborhood.value = neigh
    })

    await lookupCep('99999999')

    expect(address.value).toBe('Rua Original')
    expect(neighborhood.value).toBe('Bairro Original')
  })

  it('handles fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const address = ref('')

    const { lookupCep } = useCepLookup((addr) => {
      address.value = addr
    })

    await expect(lookupCep('01001000')).resolves.toBeUndefined()
    expect(address.value).toBe('')
  })

  it('does not fetch when CEP has fewer than 8 digits', async () => {
    global.fetch = vi.fn()

    const { lookupCep } = useCepLookup(() => {})

    await lookupCep('01001')

    expect(global.fetch).not.toHaveBeenCalled()
  })
})
