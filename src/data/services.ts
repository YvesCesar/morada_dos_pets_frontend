/**
 * Dados dos serviços oferecidos
 */
import type { Service } from '@/types'
import dogSpa from '@/assets/images/dog-spa.png'
import hospedagem from '@/assets/images/hospedagem.png'
import dogTaxi from '@/assets/images/dog-taxi.png'

export const services: Service[] = [
  {
    image: dogSpa,
    title: 'Dog Spa',
    alt: 'Cachorro no spa',
    description:
      'Oferecemos tratamentos de spa personalizados, tosas profissionais e cuidados de alta qualidade para deixar seu cão relaxado',
    route: '/servicos/dog-spa',
  },
  {
    image: hospedagem,
    title: 'Hospedagem',
    alt: 'Cachorro na hospedagem',
    description:
      'Proporcionamos conforto, diversão, garantindo que seu amigo de quatro patas tenha uma estadia feliz e tranquila enquanto você estiver ausente',
    route: '/servicos/hospedagem',
  },
  {
    image: dogTaxi,
    title: 'Dog Táxi',
    alt: 'Cachorro no táxi',
    description: 'Transporte seguro e confiável, garantindo viagens confortáveis',
  },
]
