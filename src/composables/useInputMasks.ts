/**
 * Composable para utilitários de formatação de display
 * Máscaras de input agora usam diretiva v-maska — ver src/config/masks.ts
 */
export function useInputMasks() {
  const formatDisplayDate = (dateStr: string): string => {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const getInitial = (name: string) => name.charAt(0).toUpperCase()

  const calculateAge = (birthDate: string) => {
    const parts = birthDate.split('/')
    const day = parts[0] ?? '01'
    const month = parts[1] ?? '01'
    const year = parts[2] ?? '2000'
    const birth = new Date(+year, +month - 1, +day)
    const now = new Date()
    const years = now.getFullYear() - birth.getFullYear()
    const months = now.getMonth() - birth.getMonth()
    if (years > 0) return `${years} ano${years > 1 ? 's' : ''}`
    return `${Math.max(1, months)} ${months === 1 ? 'mês' : 'meses'}`
  }

  return { formatDisplayDate, formatCurrency, getInitial, calculateAge }
}
