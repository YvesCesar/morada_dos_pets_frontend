import { z } from 'zod'
import { cardNameSchema } from './common'

const cardNumberSchema = z
  .string()
  .min(1, 'Número do cartão é obrigatório')
  .regex(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número do cartão inválido')

const cardExpirySchema = z
  .string()
  .min(1, 'Vencimento é obrigatório')
  .regex(/^\d{2} \/ \d{2}$/, 'Vencimento inválido (MM / AA)')

const securityCodeSchema = z
  .string()
  .min(1, 'Código de segurança é obrigatório')
  .regex(/^\d{3,4}$/, 'Código de segurança inválido')

export const creditCardSchema = z.object({
  cardNumber: cardNumberSchema,
  cardName: cardNameSchema,
  expiry: cardExpirySchema,
  securityCode: securityCodeSchema,
  rememberCard: z.boolean(),
  installments: z.number().min(1).max(6),
})

export const debitCardSchema = z.object({
  cardNumber: cardNumberSchema,
  cardName: cardNameSchema,
  expiry: cardExpirySchema,
  securityCode: securityCodeSchema,
  rememberCard: z.boolean(),
})
