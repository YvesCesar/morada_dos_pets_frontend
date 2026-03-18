import { useCepLookup } from '@/composables/useCepLookup'

describe('useCepLookup', () => {
  it('initializes with default empty values', () => {
    const { cep, address, neighborhood } = useCepLookup()

    expect(cep.value).toBe('')
    expect(address.value).toBe('')
    expect(neighborhood.value).toBe('')
  })

  it('initializes with provided values', () => {
    const { cep, address, neighborhood } = useCepLookup('01001-000', 'Praça da Sé', 'Sé')

    expect(cep.value).toBe('01001-000')
    expect(address.value).toBe('Praça da Sé')
    expect(neighborhood.value).toBe('Sé')
  })

  it('formats CEP on input with fewer than 8 digits', () => {
    const { cep, handleCEPInput } = useCepLookup()

    const input = document.createElement('input')
    input.value = '01001'
    handleCEPInput({ target: input } as unknown as Event)

    expect(cep.value).toBe('01001')
  })

  it('formats CEP and fetches address when 8 digits are entered', async () => {
    const mockResponse = {
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      erro: false,
    }

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    })

    const { cep, address, neighborhood, handleCEPInput } = useCepLookup()

    const input = document.createElement('input')
    input.value = '01001000'
    await handleCEPInput({ target: input } as unknown as Event)

    expect(cep.value).toBe('01001-000')
    expect(address.value).toBe('Praça da Sé')
    expect(neighborhood.value).toBe('Sé')
    expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/')
  })

  it('does not update address when API returns erro', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ erro: true }),
    })

    const { address, neighborhood, handleCEPInput } = useCepLookup('', 'Rua Original', 'Bairro Original')

    const input = document.createElement('input')
    input.value = '99999999'
    await handleCEPInput({ target: input } as unknown as Event)

    expect(address.value).toBe('Rua Original')
    expect(neighborhood.value).toBe('Bairro Original')
  })

  it('handles fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const { address, handleCEPInput } = useCepLookup()

    const input = document.createElement('input')
    input.value = '01001000'

    await expect(handleCEPInput({ target: input } as unknown as Event)).resolves.toBeUndefined()
    expect(address.value).toBe('')
  })
})
