import { z } from 'zod'
import { emailSchema } from './common'

export const newsletterSchema = z.object({
  email: emailSchema,
})
