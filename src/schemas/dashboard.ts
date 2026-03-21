import { z } from 'zod'
import { emailSchema, nameSchema, phoneSchema, cpfSchema, requiredString, alphanumericCodeSchema } from './common'

export const userFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  role: z.enum(['admin', 'customer']),
  phone: phoneSchema,
  cpf: cpfSchema,
  active: z.boolean(),
})

export const couponFormSchema = z.object({
  code: alphanumericCodeSchema('Código'),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().positive('Valor deve ser maior que zero'),
  maxUses: z.number().int().positive('Limite deve ser maior que zero'),
  expiresAt: requiredString('Data de validade'),
  active: z.boolean(),
})

export const testimonialSchema = z.object({
  quote: z
    .string()
    .min(1, 'Depoimento é obrigatório')
    .min(10, 'Depoimento deve ter pelo menos 10 caracteres')
    .max(500, 'Depoimento deve ter no máximo 500 caracteres'),
  allowPublic: z.boolean(),
})
