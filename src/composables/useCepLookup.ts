/**
 * Composable para busca automática de endereço via ViaCEP
 * Integra com vee-validate setFieldValue para preencher campos de endereço
 */
export function useCepLookup(
  setAddressFields: (address: string, neighborhood: string) => void,
) {
  const lookupCep = async (cepNumbers: string) => {
    if (cepNumbers.length !== 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`)
      const data = await response.json()
      if (!data.erro) {
        setAddressFields(data.logradouro || '', data.bairro || '')
      }
    } catch {
      /* ignore */
    }
  }

  return { lookupCep }
}
