/**
 * Tipos centralizados do projeto Morada dos Pets
 */

// ============================================
// Navigation
// ============================================

export interface NavLink {
  name: string
  to?: string
  href?: string
  isRoute: boolean
}

// ============================================
// Services
// ============================================

export interface Service {
  image: string
  title: string
  alt: string
  description: string
  route?: string
}

// ============================================
// Features
// ============================================

export interface Feature {
  icon: string
  titleLines: string[]
  alt: string
}

// ============================================
// Testimonials
// ============================================

export interface Testimonial {
  id: number
  image: string
  quote: string
  author: string
}

// ============================================
// Clients Carousel
// ============================================

export interface ClientImage {
  id: number
  image: string
  alt: string
}

// ============================================
// Tutorial Steps
// ============================================

export interface TutorialStep {
  id: number
  title: string
  description: string
}

// ============================================
// Units
// ============================================

export interface UnitCoordinates {
  lat: number
  lng: number
}

export interface Unit {
  id: string
  name: string
  image: string
  address: string
  mapUrl: string
  coordinates: UnitCoordinates
}

// ============================================
// Contact
// ============================================

export interface ContactItem {
  icon: string
  text: string
  link?: string
}

export interface ContactCard {
  title: string
  items: ContactItem[]
}

// ============================================
// Mission/Vision/Values
// ============================================

export interface MissionValue {
  icon: string
  title: string
  description: string
}

// ============================================
// Social Links
// ============================================

export interface SocialLink {
  name: string
  url: string
}

// ============================================
// Dog Spa
// ============================================

export interface DogSpaPrice {
  size: string
  price: string
}

export interface DogSpaAdditional {
  name: string
  price?: string
  description?: string
}

export interface DogSpaService {
  id: string
  image: string
  title: string
  description: string
  prices: DogSpaPrice[]
  additionals: DogSpaAdditional[]
}

export interface DogSpaBenefit {
  icon: string
  title: string
  description: string
}

// ============================================
// Hospedagem
// ============================================

export interface HospedagemPrice {
  size: string
  price: string
}

export interface HospedagemPlan {
  id: string
  image: string
  title: string
  prices: HospedagemPrice[]
}

// ============================================
// Creche
// ============================================

export interface CrechePrice {
  frequency: string
  price: string
}

export interface CrechePlan {
  id: string
  image: string
  title: string
  schedule: string
  prices: CrechePrice[]
}

// ============================================
// Pagamento (Reserva)
// ============================================

export type PaymentStep = 'solicitacao' | 'pagamento' | 'confirmacao'

export type PaymentMethod = 'pix' | 'debito' | 'credito'

export type ServiceType = 'dog-spa' | 'hospedagem' | 'creche' | 'dog-taxi' | 'geral'

export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  size: string
}

export interface ServiceRequest {
  id: string
  serviceType: string
  serviceName: string
  unit: string
  pet: Pet
  date: string
  time: string
  additionalInfo: string
  price: number
}

export interface CardPaymentData {
  cardNumber: string
  cardName: string
  expiry: string
  securityCode: string
  rememberCard: boolean
  installments?: number
}

export interface PaymentState {
  currentStep: PaymentStep
  serviceRequests: ServiceRequest[]
  paymentMethod: PaymentMethod | null
  cardData: CardPaymentData | null
  couponCode: string
  discount: number
  subtotal: number
  total: number
}

export interface ServiceOption {
  id: string
  label: string
  price: number
}

export interface UnitOption {
  id: string
  label: string
}

// ============================================
// Dashboard - Auth & Users
// ============================================

export type UserRole = 'admin' | 'customer'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  phone: string
  cpf: string
  birthDate: string
  cep: string
  address: string
  addressNumber: string
  neighborhood: string
  photo: string
  active: boolean
  createdAt: string
}

// ============================================
// Dashboard - Pets
// ============================================

export interface DashboardPet {
  id: string
  ownerId: string
  name: string
  breed: string
  birthDate: string
  weight: number
  photo: string
}

// ============================================
// Dashboard - Notifications
// ============================================

export interface Notification {
  id: string
  userId: string
  message: string
  read: boolean
  createdAt: string
}

// ============================================
// Dashboard - Appointments
// ============================================

export type AppointmentStatus = 'confirmado' | 'pendente' | 'cancelado'

export interface Appointment {
  id: string
  clientId: string
  clientName: string
  petId: string
  petName: string
  service: 'Dog Spa' | 'Hospedagem' | 'Dog Táxi'
  serviceDetail: string
  date: string
  time: string
  status: AppointmentStatus
  value: number
  unit: string
  address?: string
}

// ============================================
// Dashboard - Coupons
// ============================================

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  maxUses: number
  currentUses: number
  expiresAt: string
  active: boolean
}

// ============================================
// Dashboard - Testimonials
// ============================================

export interface DashboardTestimonial {
  id: string
  userId: string
  authorName: string
  authorPhoto: string
  quote: string
  allowPublic: boolean
  approved: boolean
  createdAt: string
}

// ============================================
// Dashboard - Metrics
// ============================================

export interface AdminMetrics {
  activeClients: number
  inactiveClients: number
  registeredPets: number
  cancellations: number
}

export interface CustomerMetrics {
  totalPets: number
  confirmedAppointments: number
  pendingAppointments: number
  totalSpent: number
}

// ============================================
// Dashboard - Submenu
// ============================================

export interface SubmenuItem {
  label: string
  icon: string
  route: string
}
