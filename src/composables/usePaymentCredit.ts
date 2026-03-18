import { reactive } from 'vue'
import type { CardPaymentData } from '@/types'

/**
 * Composable para o formulário de cartão de crédito
 */
export function usePaymentCredit(emit: (event: 'back' | 'submit', data?: CardPaymentData) => void) {
  const form = reactive<CardPaymentData>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    securityCode: '',
    rememberCard: false,
    installments: 1,
  })

  const installmentOptions = [
    { value: 1, label: '1x (à vista)' },
    { value: 2, label: '2x' },
    { value: 3, label: '3x' },
    { value: 4, label: '4x' },
    { value: 5, label: '5x' },
    { value: 6, label: '6x' },
  ]

  const formatCardNumber = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')
    if (value.length > 16) value = value.slice(0, 16)
    form.cardNumber = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiry = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    if (value.length >= 2) {
      form.expiry = value.slice(0, 2) + ' / ' + value.slice(2)
    } else {
      form.expiry = value
    }
  }

  const handleSubmit = () => {
    emit('submit', { ...form })
  }

  return {
    form,
    installmentOptions,
    formatCardNumber,
    formatExpiry,
    handleSubmit,
  }
}
