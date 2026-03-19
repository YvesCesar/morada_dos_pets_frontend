import { z } from 'zod'

export const requiredString = (label: string) =>
  z.string().min(1, `${label} é obrigatório`)

export const emailSchema = z
  .string()
  .min(1, 'E-mail é obrigatório')
  .email('E-mail inválido')

export const passwordSchema = z
  .string()
  .min(1, 'Senha é obrigatória')
  .min(6, 'Mínimo 6 caracteres')

export const nameSchema = z
  .string()
  .min(1, 'Nome é obrigatório')
  .min(2, 'Nome deve ter pelo menos 2 caracteres')

export const phoneSchema = z
  .string()
  .min(1, 'Celular é obrigatório')
  .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Celular inválido')

export const cpfSchema = z
  .string()
  .min(1, 'CPF é obrigatório')
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')

export const cepSchema = z
  .string()
  .min(1, 'CEP é obrigatório')
  .regex(/^\d{5}-\d{3}$/, 'CEP inválido')

export const dateSchema = z
  .string()
  .min(1, 'Data é obrigatória')
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida (DD/MM/AAAA)')
