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
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ'\-\s]+$/, 'Nome deve conter apenas letras')

export const cardNameSchema = z
  .string()
  .min(1, 'Nome no cartão é obrigatório')
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Nome no cartão deve conter apenas letras')

export const addressSchema = (label: string) =>
  z
    .string()
    .min(1, `${label} é obrigatório`)
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,\-°º\/]+$/, 'Endereço contém caracteres inválidos')

export const addressNumberSchema = z
  .string()
  .min(1, 'Número é obrigatório')
  .regex(/^[0-9]+[A-Za-z]?$/, 'Número deve conter apenas dígitos e opcionalmente uma letra')

export const neighborhoodSchema = (label: string) =>
  z
    .string()
    .min(1, `${label} é obrigatório`)
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-]+$/, 'Bairro contém caracteres inválidos')

export const breedSchema = z
  .string()
  .min(1, 'Raça é obrigatória')
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/, 'Raça deve conter apenas letras')

export const alphanumericCodeSchema = (label: string) =>
  z
    .string()
    .min(1, `${label} é obrigatório`)
    .regex(/^[A-Za-z0-9\-_]+$/, 'Código deve conter apenas letras, números, hífens e underscores')

export const subjectSchema = (label: string) =>
  z
    .string()
    .min(1, `${label} é obrigatório`)
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,!?;:\-'()]+$/, 'Assunto contém caracteres inválidos')

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
