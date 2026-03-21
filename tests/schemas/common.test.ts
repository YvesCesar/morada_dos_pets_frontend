import { emailSchema, passwordSchema, nameSchema, phoneSchema, cpfSchema, cepSchema, dateSchema, requiredString, cardNameSchema, addressSchema, addressNumberSchema, neighborhoodSchema, breedSchema, alphanumericCodeSchema, subjectSchema } from '@/schemas'

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

    it('accepts name with accents', () => {
      expect(nameSchema.safeParse('João da Conceição').success).toBe(true)
    })

    it('accepts hyphenated name', () => {
      expect(nameSchema.safeParse('Ana-Maria').success).toBe(true)
    })

    it('accepts name with apostrophe', () => {
      expect(nameSchema.safeParse("D'Ávila").success).toBe(true)
    })

    it('rejects empty name', () => {
      expect(nameSchema.safeParse('').success).toBe(false)
    })

    it('rejects single character name', () => {
      expect(nameSchema.safeParse('M').success).toBe(false)
    })

    it('rejects name with numbers', () => {
      expect(nameSchema.safeParse('Maria123').success).toBe(false)
    })

    it('rejects name with symbols', () => {
      expect(nameSchema.safeParse('João@Silva').success).toBe(false)
    })
  })

  describe('cardNameSchema', () => {
    it('accepts valid card name', () => {
      expect(cardNameSchema.safeParse('CARLOS OLIVEIRA').success).toBe(true)
    })

    it('accepts card name with accents', () => {
      expect(cardNameSchema.safeParse('ANA MARIA').success).toBe(true)
    })

    it('rejects empty card name', () => {
      expect(cardNameSchema.safeParse('').success).toBe(false)
    })

    it('rejects card name with numbers', () => {
      expect(cardNameSchema.safeParse('CARLOS123').success).toBe(false)
    })

    it('rejects card name with symbols', () => {
      expect(cardNameSchema.safeParse('ANA@B').success).toBe(false)
    })
  })

  describe('addressSchema', () => {
    it('accepts valid address', () => {
      expect(addressSchema('Endereço').safeParse('Av. Faria Lima').success).toBe(true)
    })

    it('accepts address with numbers and punctuation', () => {
      expect(addressSchema('Endereço').safeParse('R. 25 de Março, 100').success).toBe(true)
    })

    it('rejects empty address', () => {
      expect(addressSchema('Endereço').safeParse('').success).toBe(false)
    })

    it('rejects address with invalid symbols', () => {
      expect(addressSchema('Endereço').safeParse('Rua @#$').success).toBe(false)
    })
  })

  describe('addressNumberSchema', () => {
    it('accepts numeric address number', () => {
      expect(addressNumberSchema.safeParse('42').success).toBe(true)
    })

    it('accepts number with letter suffix', () => {
      expect(addressNumberSchema.safeParse('100A').success).toBe(true)
    })

    it('accepts large number', () => {
      expect(addressNumberSchema.safeParse('1234').success).toBe(true)
    })

    it('rejects empty number', () => {
      expect(addressNumberSchema.safeParse('').success).toBe(false)
    })

    it('rejects letters only', () => {
      expect(addressNumberSchema.safeParse('abc').success).toBe(false)
    })

    it('rejects number with hyphen', () => {
      expect(addressNumberSchema.safeParse('42-B').success).toBe(false)
    })
  })

  describe('neighborhoodSchema', () => {
    it('accepts valid neighborhood', () => {
      expect(neighborhoodSchema('Bairro').safeParse('Itaim Bibi').success).toBe(true)
    })

    it('accepts neighborhood with accents', () => {
      expect(neighborhoodSchema('Bairro').safeParse('Vila São Francisco').success).toBe(true)
    })

    it('rejects empty neighborhood', () => {
      expect(neighborhoodSchema('Bairro').safeParse('').success).toBe(false)
    })

    it('rejects neighborhood with symbols', () => {
      expect(neighborhoodSchema('Bairro').safeParse('Bairro@123').success).toBe(false)
    })
  })

  describe('breedSchema', () => {
    it('accepts valid breed', () => {
      expect(breedSchema.safeParse('Labrador').success).toBe(true)
    })

    it('accepts hyphenated breed', () => {
      expect(breedSchema.safeParse('Pastor-Alemão').success).toBe(true)
    })

    it('accepts breed with spaces', () => {
      expect(breedSchema.safeParse('Shih Tzu').success).toBe(true)
    })

    it('rejects empty breed', () => {
      expect(breedSchema.safeParse('').success).toBe(false)
    })

    it('rejects breed with numbers', () => {
      expect(breedSchema.safeParse('Labrador123').success).toBe(false)
    })
  })

  describe('alphanumericCodeSchema', () => {
    it('accepts alphanumeric code', () => {
      expect(alphanumericCodeSchema('Código').safeParse('MORADA10').success).toBe(true)
    })

    it('accepts code with hyphens', () => {
      expect(alphanumericCodeSchema('Código').safeParse('PETS-2026').success).toBe(true)
    })

    it('accepts code with underscores', () => {
      expect(alphanumericCodeSchema('Código').safeParse('CUPOM_NOVO').success).toBe(true)
    })

    it('rejects empty code', () => {
      expect(alphanumericCodeSchema('Código').safeParse('').success).toBe(false)
    })

    it('rejects code with spaces and special chars', () => {
      expect(alphanumericCodeSchema('Código').safeParse('MORADA 10!').success).toBe(false)
    })
  })

  describe('subjectSchema', () => {
    it('accepts valid subject', () => {
      expect(subjectSchema('Assunto').safeParse('Dúvida sobre banho e tosa').success).toBe(true)
    })

    it('accepts subject with punctuation', () => {
      expect(subjectSchema('Assunto').safeParse('Olá, preciso de ajuda!').success).toBe(true)
    })

    it('rejects empty subject', () => {
      expect(subjectSchema('Assunto').safeParse('').success).toBe(false)
    })

    it('rejects subject with HTML tags', () => {
      expect(subjectSchema('Assunto').safeParse('Assunto <script>').success).toBe(false)
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
