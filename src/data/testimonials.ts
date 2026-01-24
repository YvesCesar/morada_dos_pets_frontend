/**
 * Dados dos depoimentos de clientes
 */
import type { Testimonial } from '@/types'
import clienteImg from '@/assets/images/testemunho-cliente.png'

export const testimonials: Testimonial[] = [
  {
    id: 1,
    image: clienteImg,
    quote:
      'Eu deixei meu cãozinho no hotel e fiquei muito satisfeita com o serviço prestado. Os funcionários foram super atenciosos e meu cachorro se divertiu muito durante todo o dia. Foi ótimo poder ter essa opção para cuidar do meu pet enquanto eu estava no trabalho. Recomendo!',
    author: 'Cley Celeste',
  },
  {
    id: 2,
    image: clienteImg,
    quote:
      'Melhor hotel para pets de Manaus! Deixei minha cachorrinha por uma semana e ela voltou super feliz. A equipe é incrível e muito carinhosa. Com certeza voltarei!',
    author: 'Maria Santos',
  },
  {
    id: 3,
    image: clienteImg,
    quote:
      'Atendimento excelente e ambiente muito acolhedor. Meu pet foi muito bem cuidado. Recomendo a todos que precisam de um lugar seguro para deixar seus animais.',
    author: 'João Silva',
  },
]
