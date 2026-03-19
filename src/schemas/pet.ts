import { z } from 'zod'
import { nameSchema, dateSchema } from './common'

export const petSchema = z.object({
  name: nameSchema,
  birthDate: dateSchema,
  breed: z.string().min(1, 'Raça é obrigatória'),
  weight: z.number().positive('Peso deve ser maior que zero'),
})
