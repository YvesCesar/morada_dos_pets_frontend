import { loginSchema, registerStep1Schema, registerStep2Schema, changePasswordSchema } from '@/schemas'

describe('auth schemas', () => {
  describe('loginSchema', () => {
    it('accepts valid credentials', () => {
      expect(loginSchema.safeParse({
        email: 'admin@petshop.com',
        password: 'senhaSegura',
      }).success).toBe(true)
    })

    it('rejects empty email', () => {
      expect(loginSchema.safeParse({
        email: '',
        password: 'senhaSegura',
      }).success).toBe(false)
    })

    it('rejects empty password', () => {
      expect(loginSchema.safeParse({
        email: 'admin@petshop.com',
        password: '',
      }).success).toBe(false)
    })
  })

  describe('registerStep1Schema', () => {
    it('accepts matching passwords', () => {
      expect(registerStep1Schema.safeParse({
        email: 'novo@petshop.com',
        password: 'senhaForte',
        confirmPassword: 'senhaForte',
      }).success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      expect(registerStep1Schema.safeParse({
        email: 'novo@petshop.com',
        password: 'senhaForte',
        confirmPassword: 'outraSenha',
      }).success).toBe(false)
    })

    it('rejects short password', () => {
      expect(registerStep1Schema.safeParse({
        email: 'novo@petshop.com',
        password: 'abc',
        confirmPassword: 'abc',
      }).success).toBe(false)
    })
  })

  describe('registerStep2Schema', () => {
    it('accepts valid personal data', () => {
      expect(registerStep2Schema.safeParse({
        nome: 'João da Silva',
        dataNascimento: '15/06/1990',
        cpf: '123.456.789-00',
        celular: '(11) 98765-4321',
        cep: '01001-000',
        endereco: 'Rua das Flores',
        numero: '42',
        bairro: 'Centro',
      }).success).toBe(true)
    })

    it('rejects invalid CPF format', () => {
      expect(registerStep2Schema.safeParse({
        nome: 'João da Silva',
        dataNascimento: '15/06/1990',
        cpf: '12345678900',
        celular: '(11) 98765-4321',
        cep: '01001-000',
        endereco: 'Rua das Flores',
        numero: '42',
        bairro: 'Centro',
      }).success).toBe(false)
    })

    it('rejects name with numbers', () => {
      expect(registerStep2Schema.safeParse({
        nome: 'João123',
        dataNascimento: '15/06/1990',
        cpf: '123.456.789-00',
        celular: '(11) 98765-4321',
        cep: '01001-000',
        endereco: 'Rua das Flores',
        numero: '42',
        bairro: 'Centro',
      }).success).toBe(false)
    })

    it('rejects address number with only letters', () => {
      expect(registerStep2Schema.safeParse({
        nome: 'João da Silva',
        dataNascimento: '15/06/1990',
        cpf: '123.456.789-00',
        celular: '(11) 98765-4321',
        cep: '01001-000',
        endereco: 'Rua das Flores',
        numero: 'abc',
        bairro: 'Centro',
      }).success).toBe(false)
    })
  })

  describe('changePasswordSchema', () => {
    it('accepts valid password change', () => {
      expect(changePasswordSchema.safeParse({
        currentPassword: 'senhaAtual',
        newPassword: 'senhaNova123',
        confirmPassword: 'senhaNova123',
      }).success).toBe(true)
    })

    it('rejects mismatched new passwords', () => {
      expect(changePasswordSchema.safeParse({
        currentPassword: 'senhaAtual',
        newPassword: 'senhaNova123',
        confirmPassword: 'senhaDiferente',
      }).success).toBe(false)
    })
  })
})
