import { ref } from 'vue'
import { useInputMasks } from './useInputMasks'

/**
 * Composable para busca automática de endereço via ViaCEP
 */
export function useCepLookup(initialCep = '', initialAddress = '', initialNeighborhood = '') {
  const { formatCEP } = useInputMasks()

  const cep = ref(initialCep)
  const address = ref(initialAddress)
  const neighborhood = ref(initialNeighborhood)

  const handleCEPInput = async (event: Event) => {
    const target = event.target as HTMLInputElement
    cep.value = formatCEP(target.value)

    const cepNumbers = cep.value.replace(/\D/g, '')
    if (cepNumbers.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`)
        const data = await response.json()
        if (!data.erro) {
          address.value = data.logradouro || ''
          neighborhood.value = data.bairro || ''
        }
      } catch {
        /* ignore */
      }
    }
  }

  return { cep, address, neighborhood, handleCEPInput }
}
