import { z } from 'zod'
import { nameSchema, phoneSchema, cepSchema, addressSchema, addressNumberSchema, neighborhoodSchema } from './common'

export const profileSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  cep: cepSchema,
  address: addressSchema('Endereço'),
  addressNumber: addressNumberSchema,
  neighborhood: neighborhoodSchema('Bairro'),
})
