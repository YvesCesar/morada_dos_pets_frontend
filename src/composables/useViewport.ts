/**
 * Composable para detecção de viewport e responsividade
 *
 * @example
 * ```vue
 * <script setup>
 * import { useViewport } from '@/composables/useViewport'
 *
 * const { isMobile, isTablet, isDesktop, width } = useViewport()
 * </script>
 * ```
 */
import { ref, computed, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue'

export interface UseViewportOptions {
  /** Breakpoint para mobile (default: 768) */
  mobileBreakpoint?: number
  /** Breakpoint para tablet (default: 992) */
  tabletBreakpoint?: number
  /** Breakpoint para desktop (default: 1200) */
  desktopBreakpoint?: number
}

export interface UseViewportReturn {
  /** Largura atual da viewport */
  width: Ref<number>
  /** Altura atual da viewport */
  height: Ref<number>
  /** Se é dispositivo mobile (<= mobileBreakpoint) */
  isMobile: ComputedRef<boolean>
  /** Se é tablet (entre mobile e desktop) */
  isTablet: ComputedRef<boolean>
  /** Se é desktop (> tabletBreakpoint) */
  isDesktop: ComputedRef<boolean>
}

export function useViewport(options: UseViewportOptions = {}): UseViewportReturn {
  const {
    mobileBreakpoint = 768,
    tabletBreakpoint = 992,
  } = options

  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0)

  const isMobile = computed(() => width.value <= mobileBreakpoint)
  const isTablet = computed(() => width.value > mobileBreakpoint && width.value <= tabletBreakpoint)
  const isDesktop = computed(() => width.value > tabletBreakpoint)

  const updateDimensions = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
  })

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
  }
}
