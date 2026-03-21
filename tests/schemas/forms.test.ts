import { contactSchema, profileSchema, creditCardSchema, debitCardSchema, petSchema, newsletterSchema, serviceRequestSchema } from '@/schemas'
import { userFormSchema, couponFormSchema, testimonialSchema } from '@/schemas'

describe('contactSchema', () => {
  it('accepts valid contact form', () => {
    expect(contactSchema.safeParse({
      name: 'Maria Santos',
      email: 'maria@petshop.com',
      phone: '(21) 99876-5432',
      subject: 'Dúvida sobre banho',
      message: 'Gostaria de saber os horários disponíveis para banho de golden retriever.',
    }).success).toBe(true)
  })

  it('rejects short message', () => {
    expect(contactSchema.safeParse({
      name: 'Maria Santos',
      email: 'maria@petshop.com',
      phone: '(21) 99876-5432',
      subject: 'Dúvida',
      message: 'Olá',
    }).success).toBe(false)
  })

  it('rejects subject with HTML tags', () => {
    expect(contactSchema.safeParse({
      name: 'Maria Santos',
      email: 'maria@petshop.com',
      phone: '(21) 99876-5432',
      subject: 'Assunto <script>',
      message: 'Gostaria de saber os horários disponíveis para banho de golden retriever.',
    }).success).toBe(false)
  })
})

describe('profileSchema', () => {
  it('accepts valid profile data', () => {
    expect(profileSchema.safeParse({
      name: 'Carlos Oliveira',
      phone: '(11) 98765-4321',
      cep: '04538-132',
      address: 'Avenida Brigadeiro Faria Lima',
      addressNumber: '1234',
      neighborhood: 'Itaim Bibi',
    }).success).toBe(true)
  })

  it('rejects empty name', () => {
    expect(profileSchema.safeParse({
      name: '',
      phone: '(11) 98765-4321',
      cep: '04538-132',
      address: 'Av. Faria Lima',
      addressNumber: '1234',
      neighborhood: 'Itaim',
    }).success).toBe(false)
  })

  it('rejects name with numbers', () => {
    expect(profileSchema.safeParse({
      name: 'Carlos123',
      phone: '(11) 98765-4321',
      cep: '04538-132',
      address: 'Av. Faria Lima',
      addressNumber: '1234',
      neighborhood: 'Itaim Bibi',
    }).success).toBe(false)
  })

  it('rejects address number with only letters', () => {
    expect(profileSchema.safeParse({
      name: 'Carlos Oliveira',
      phone: '(11) 98765-4321',
      cep: '04538-132',
      address: 'Av. Faria Lima',
      addressNumber: 'abc',
      neighborhood: 'Itaim Bibi',
    }).success).toBe(false)
  })
})

describe('creditCardSchema', () => {
  it('accepts valid credit card data', () => {
    expect(creditCardSchema.safeParse({
      cardNumber: '4111 1111 1111 1111',
      cardName: 'CARLOS OLIVEIRA',
      expiry: '12 / 28',
      securityCode: '123',
      rememberCard: false,
      installments: 3,
    }).success).toBe(true)
  })

  it('rejects invalid card number', () => {
    expect(creditCardSchema.safeParse({
      cardNumber: '4111',
      cardName: 'CARLOS OLIVEIRA',
      expiry: '12 / 28',
      securityCode: '123',
      rememberCard: false,
      installments: 1,
    }).success).toBe(false)
  })

  it('rejects card name with numbers', () => {
    expect(creditCardSchema.safeParse({
      cardNumber: '4111 1111 1111 1111',
      cardName: 'CARLOS 123',
      expiry: '12 / 28',
      securityCode: '123',
      rememberCard: false,
      installments: 3,
    }).success).toBe(false)
  })
})

describe('debitCardSchema', () => {
  it('accepts valid debit card data', () => {
    expect(debitCardSchema.safeParse({
      cardNumber: '5500 0000 0000 0004',
      cardName: 'ANA PEREIRA',
      expiry: '06 / 27',
      securityCode: '456',
      rememberCard: true,
    }).success).toBe(true)
  })

  it('rejects card name with numbers', () => {
    expect(debitCardSchema.safeParse({
      cardNumber: '5500 0000 0000 0004',
      cardName: 'ANA 123',
      expiry: '06 / 27',
      securityCode: '456',
      rememberCard: true,
    }).success).toBe(false)
  })
})

describe('petSchema', () => {
  it('accepts valid pet data', () => {
    expect(petSchema.safeParse({
      name: 'Rex',
      birthDate: '10/03/2020',
      breed: 'Labrador',
      weight: 28.5,
    }).success).toBe(true)
  })

  it('rejects zero weight', () => {
    expect(petSchema.safeParse({
      name: 'Rex',
      birthDate: '10/03/2020',
      breed: 'Labrador',
      weight: 0,
    }).success).toBe(false)
  })

  it('rejects negative weight', () => {
    expect(petSchema.safeParse({
      name: 'Rex',
      birthDate: '10/03/2020',
      breed: 'Labrador',
      weight: -5,
    }).success).toBe(false)
  })

  it('rejects breed with numbers', () => {
    expect(petSchema.safeParse({
      name: 'Rex',
      birthDate: '10/03/2020',
      breed: 'Labrador123',
      weight: 28.5,
    }).success).toBe(false)
  })
})

describe('userFormSchema', () => {
  it('accepts valid user data', () => {
    expect(userFormSchema.safeParse({
      name: 'Fernanda Costa',
      email: 'fernanda@petshop.com',
      role: 'customer',
      phone: '(31) 99887-6543',
      cpf: '987.654.321-00',
      active: true,
    }).success).toBe(true)
  })

  it('rejects invalid role', () => {
    expect(userFormSchema.safeParse({
      name: 'Fernanda Costa',
      email: 'fernanda@petshop.com',
      role: 'superadmin',
      phone: '(31) 99887-6543',
      cpf: '987.654.321-00',
      active: true,
    }).success).toBe(false)
  })
})

describe('couponFormSchema', () => {
  it('accepts valid coupon data', () => {
    expect(couponFormSchema.safeParse({
      code: 'MORADA10',
      type: 'percentage',
      value: 10,
      maxUses: 100,
      expiresAt: '2026-12-31',
      active: true,
    }).success).toBe(true)
  })

  it('rejects zero value', () => {
    expect(couponFormSchema.safeParse({
      code: 'CUPOM0',
      type: 'fixed',
      value: 0,
      maxUses: 50,
      expiresAt: '2026-06-30',
      active: true,
    }).success).toBe(false)
  })

  it('rejects code with spaces and special characters', () => {
    expect(couponFormSchema.safeParse({
      code: 'MORADA 10!',
      type: 'percentage',
      value: 10,
      maxUses: 100,
      expiresAt: '2026-12-31',
      active: true,
    }).success).toBe(false)
  })
})

describe('testimonialSchema', () => {
  it('accepts valid testimonial', () => {
    expect(testimonialSchema.safeParse({
      quote: 'Excelente atendimento na Morada dos Pets! Meu cachorro adorou.',
      allowPublic: true,
    }).success).toBe(true)
  })

  it('rejects short testimonial', () => {
    expect(testimonialSchema.safeParse({
      quote: 'Bom',
      allowPublic: false,
    }).success).toBe(false)
  })

  it('rejects testimonial over 500 chars', () => {
    expect(testimonialSchema.safeParse({
      quote: 'a'.repeat(501),
      allowPublic: true,
    }).success).toBe(false)
  })
})

describe('newsletterSchema', () => {
  it('accepts valid email', () => {
    expect(newsletterSchema.safeParse({ email: 'pet@lover.com' }).success).toBe(true)
  })

  it('rejects invalid email', () => {
    expect(newsletterSchema.safeParse({ email: 'invalido' }).success).toBe(false)
  })
})

describe('serviceRequestSchema', () => {
  it('accepts valid service request', () => {
    expect(serviceRequestSchema.safeParse({
      selectedServiceType: 'dog-spa',
      selectedService: 'banho-completo',
      selectedUnit: 'unidade-centro',
      selectedPet: 'pet-001',
      selectedDate: '2026-04-15',
      selectedTime: '10:00',
    }).success).toBe(true)
  })

  it('rejects empty required fields', () => {
    expect(serviceRequestSchema.safeParse({
      selectedServiceType: '',
      selectedService: '',
      selectedUnit: '',
      selectedPet: '',
      selectedDate: '',
      selectedTime: '',
    }).success).toBe(false)
  })
})
