import { z } from 'zod'

export const serviceRequestSchema = z.object({
  selectedServiceType: z.string().min(1, 'Tipo de serviço é obrigatório'),
  selectedService: z.string().min(1, 'Serviço é obrigatório'),
  selectedUnit: z.string().min(1, 'Unidade é obrigatória'),
  selectedPet: z.string().min(1, 'Pet é obrigatório'),
  selectedDate: z.string().min(1, 'Data é obrigatória'),
  selectedTime: z.string().min(1, 'Horário é obrigatório'),
})
