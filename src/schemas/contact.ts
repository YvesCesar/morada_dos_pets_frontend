import { z } from 'zod'
import { emailSchema, nameSchema, phoneSchema, requiredString } from './common'

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: requiredString('Assunto'),
  message: requiredString('Mensagem').pipe(z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres')),
})
