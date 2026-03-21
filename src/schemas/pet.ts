import { z } from 'zod'
import { nameSchema, dateSchema, breedSchema } from './common'

export const petSchema = z.object({
  name: nameSchema,
  birthDate: dateSchema,
  breed: breedSchema,
  weight: z.number().positive('Peso deve ser maior que zero'),
})
