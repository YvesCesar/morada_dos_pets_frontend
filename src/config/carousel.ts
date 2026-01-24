/**
 * Configurações de dimensões para carrosséis
 */

export const CAROUSEL_CONFIG = {
  /** Largura padrão do card em desktop (px) */
  CARD_WIDTH: 407,
  /** Gap entre cards (px) */
  GAP: 9,
  /** Altura padrão do card (px) */
  CARD_HEIGHT: 307,
} as const

export const CAROUSEL_BREAKPOINTS = {
  /** Configuração para telas até 1400px */
  LARGE: {
    cardWidth: 350,
    cardHeight: 264,
  },
  /** Configuração para telas até 1200px */
  MEDIUM: {
    cardWidth: 300,
    cardHeight: 226,
  },
  /** Configuração para telas até 992px */
  SMALL: {
    cardWidth: 260,
    cardHeight: 200,
  },
} as const

export type CarouselConfig = typeof CAROUSEL_CONFIG
export type CarouselBreakpoints = typeof CAROUSEL_BREAKPOINTS
