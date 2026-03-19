import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { creditCardSchema } from '@/schemas'
import type { CardPaymentData } from '@/types'

/**
 * Composable para o formulário de cartão de crédito
 */
export function usePaymentCredit(emit: (event: 'back' | 'submit', data?: CardPaymentData) => void) {
  const { handleSubmit, errors, defineField, meta } = useForm({
    validationSchema: toTypedSchema(creditCardSchema),
    initialValues: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      securityCode: '',
      rememberCard: false,
      installments: 1,
    },
  })

  const [cardNumber, cardNumberAttrs] = defineField('cardNumber')
  const [cardName, cardNameAttrs] = defineField('cardName')
  const [expiry, expiryAttrs] = defineField('expiry')
  const [securityCode, securityCodeAttrs] = defineField('securityCode')
  const [rememberCard, rememberCardAttrs] = defineField('rememberCard')
  const [installments, installmentsAttrs] = defineField('installments')

  const installmentOptions = [
    { value: 1, label: '1x (à vista)' },
    { value: 2, label: '2x' },
    { value: 3, label: '3x' },
    { value: 4, label: '4x' },
    { value: 5, label: '5x' },
    { value: 6, label: '6x' },
  ]

  const onSubmit = handleSubmit((values) => {
    emit('submit', { ...values })
  })

  return {
    cardNumber,
    cardNumberAttrs,
    cardName,
    cardNameAttrs,
    expiry,
    expiryAttrs,
    securityCode,
    securityCodeAttrs,
    rememberCard,
    rememberCardAttrs,
    installments,
    installmentsAttrs,
    installmentOptions,
    errors,
    meta,
    handleSubmit: onSubmit,
  }
}
