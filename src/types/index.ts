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
