import { emailSchema, passwordSchema, nameSchema, phoneSchema, cpfSchema, cepSchema, dateSchema, requiredString } from '@/schemas'

describe('common schemas', () => {
  describe('emailSchema', () => {
    it('accepts valid email', () => {
      expect(emailSchema.safeParse('cliente@petshop.com').success).toBe(true)
    })

    it('rejects empty email', () => {
      const result = emailSchema.safeParse('')
      expect(result.success).toBe(false)
    })

    it('rejects invalid email format', () => {
      const result = emailSchema.safeParse('sem-arroba')
      expect(result.success).toBe(false)
    })
  })

  describe('passwordSchema', () => {
    it('accepts password with 6+ chars', () => {
      expect(passwordSchema.safeParse('senhaForte').success).toBe(true)
    })

    it('rejects empty password', () => {
      expect(passwordSchema.safeParse('').success).toBe(false)
    })

    it('rejects short password', () => {
      expect(passwordSchema.safeParse('abc').success).toBe(false)
    })
  })

  describe('nameSchema', () => {
    it('accepts valid name', () => {
      expect(nameSchema.safeParse('Maria Silva').success).toBe(true)
    })

    it('rejects empty name', () => {
      expect(nameSchema.safeParse('').success).toBe(false)
    })

    it('rejects single character name', () => {
      expect(nameSchema.safeParse('M').success).toBe(false)
    })
  })

  describe('phoneSchema', () => {
    it('accepts formatted phone', () => {
      expect(phoneSchema.safeParse('(11) 98765-4321').success).toBe(true)
    })

    it('rejects unformatted phone', () => {
      expect(phoneSchema.safeParse('11987654321').success).toBe(false)
    })

    it('rejects empty phone', () => {
      expect(phoneSchema.safeParse('').success).toBe(false)
    })
  })

  describe('cpfSchema', () => {
    it('accepts formatted CPF', () => {
      expect(cpfSchema.safeParse('123.456.789-00').success).toBe(true)
    })

    it('rejects unformatted CPF', () => {
      expect(cpfSchema.safeParse('12345678900').success).toBe(false)
    })
  })

  describe('cepSchema', () => {
    it('accepts formatted CEP', () => {
      expect(cepSchema.safeParse('01001-000').success).toBe(true)
    })

    it('rejects unformatted CEP', () => {
      expect(cepSchema.safeParse('01001000').success).toBe(false)
    })
  })

  describe('dateSchema', () => {
    it('accepts DD/MM/YYYY format', () => {
      expect(dateSchema.safeParse('15/06/1995').success).toBe(true)
    })

    it('rejects invalid format', () => {
      expect(dateSchema.safeParse('1995-06-15').success).toBe(false)
    })
  })

  describe('requiredString', () => {
    it('accepts non-empty string', () => {
      expect(requiredString('Campo').safeParse('valor').success).toBe(true)
    })

    it('rejects empty string', () => {
      const result = requiredString('Campo').safeParse('')
      expect(result.success).toBe(false)
    })
  })
})
