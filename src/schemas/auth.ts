import { z } from 'zod'
import { emailSchema, passwordSchema, nameSchema, phoneSchema, cpfSchema, cepSchema, dateSchema, addressSchema, addressNumberSchema, neighborhoodSchema } from './common'

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
})

export const registerStep1Schema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirme a senha'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

export const registerStep2Schema = z.object({
  nome: nameSchema,
  dataNascimento: dateSchema,
  cpf: cpfSchema,
  celular: phoneSchema,
  cep: cepSchema,
  endereco: addressSchema('Endereço'),
  numero: addressNumberSchema,
  bairro: neighborhoodSchema('Bairro'),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirme a nova senha'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})
