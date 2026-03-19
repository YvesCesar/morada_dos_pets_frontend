import { z } from 'zod'
import { nameSchema, phoneSchema, cepSchema, requiredString } from './common'

export const profileSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  cep: cepSchema,
  address: requiredString('Endereço'),
  addressNumber: requiredString('Número'),
  neighborhood: requiredString('Bairro'),
})
