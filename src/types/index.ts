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

export interface Unit {
  image: string
  address: string
  mapUrl: string
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
