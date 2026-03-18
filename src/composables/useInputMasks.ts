/**
 * Composable para máscaras de input reutilizáveis
 */
export function useInputMasks() {
  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers.length ? `(${numbers}` : ''
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

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

  return { formatDate, formatCPF, formatPhone, formatCEP, formatDisplayDate, formatCurrency, getInitial, calculateAge }
}
