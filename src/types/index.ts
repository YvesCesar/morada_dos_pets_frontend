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
