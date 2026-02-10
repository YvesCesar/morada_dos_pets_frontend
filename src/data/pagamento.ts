/**
 * Dados mock para a página de Pagamento (Reserva)
 */
import type { Pet, ServiceOption, UnitOption } from '@/types'

export const mockPets: Pet[] = [
  { id: '1', name: 'Marley', species: 'Cachorro', breed: 'Golden Retriever', size: 'Grande' },
  { id: '2', name: 'Bob', species: 'Cachorro', breed: 'Bulldog Francês', size: 'Médio' },
  { id: '3', name: 'Billie', species: 'Gato', breed: 'Siamês', size: 'Pequeno' },
  { id: '4', name: 'Isis', species: 'Cachorro', breed: 'Poodle', size: 'Pequeno' },
]

export const serviceTypes = [
  { id: 'dog-spa', label: 'Dog Spa' },
  { id: 'hospedagem', label: 'Hospedagem' },
  { id: 'creche', label: 'Creche' },
  { id: 'dog-taxi', label: 'Dog Táxi' },
]

export const serviceOptions: Record<string, ServiceOption[]> = {
  'dog-spa': [
    { id: 'banho', label: 'Banho', price: 80 },
    { id: 'tosa', label: 'Tosa', price: 60 },
    { id: 'massagem', label: 'Sessão de massagem', price: 100 },
  ],
  'hospedagem': [
    { id: 'diaria-comum', label: 'Diária Comum', price: 120 },
    { id: 'feriado', label: 'Feriado / Fim de semana', price: 150 },
    { id: 'alta-temporada', label: 'Alta temporada', price: 180 },
  ],
  'creche': [
    { id: 'meio-periodo', label: 'Meio período', price: 70 },
    { id: 'integral', label: 'Período integral', price: 120 },
  ],
  'dog-taxi': [
    { id: 'transporte', label: 'Transporte', price: 50 },
  ],
}

export const unitOptions: UnitOption[] = [
  { id: 'horizonte', label: 'Horizonte - Rua Holanda, n° 125' },
  { id: 'sao-bernardo', label: 'São Bernardo - Av. Flores, n° 86' },
]

export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
]
