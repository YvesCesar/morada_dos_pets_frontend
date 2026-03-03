<script setup lang="ts">
import { computed } from 'vue'
import { useViewport, useInfiniteCarousel, useSwipe } from '@/composables'
import { clients } from '@/data/clients'
import { CAROUSEL_CONFIG, CAROUSEL_BREAKPOINTS } from '@/config/carousel'
import arrowCarousel from '@/assets/images/arrow-carousel.svg'

// Composables
const { isMobile, width } = useViewport()

const {
  currentIndex,
  extendedItems: extendedClients,
  isTransitioning,
  next,
  prev,
  handleTransitionEnd,
} = useInfiniteCarousel(clients)

const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
  onSwipeLeft: next,
  onSwipeRight: prev,
})

// Computed card width based on viewport
const cardWidth = computed(() => {
  if (isMobile.value) {
    return 0 // Mobile uses percentage, not pixels
  }

  if (width.value <= 992) {
    return CAROUSEL_BREAKPOINTS.SMALL.cardWidth
  }
  if (width.value <= 1200) {
    return CAROUSEL_BREAKPOINTS.MEDIUM.cardWidth
  }
  if (width.value <= 1400) {
    return CAROUSEL_BREAKPOINTS.LARGE.cardWidth
  }
  return CAROUSEL_CONFIG.CARD_WIDTH
})

// Computed transform
const getTranslateX = () => {
  if (isMobile.value) {
    return `translateX(-${currentIndex.value * 100}%)`
  }

  // Calculate transform using the correct card width for the current viewport
  const cardAndGap = cardWidth.value + CAROUSEL_CONFIG.GAP
  return `translateX(-${currentIndex.value * cardAndGap}px)`
}
</script>

<template>
  <section class="clients-carousel">
    <div class="clients-carousel__header">
      <h2 class="clients-carousel__title">Conheça alguns dos nossos clientes</h2>
    </div>

    <div class="clients-carousel__wrapper">
      <!-- Navigation Arrow Left -->
      <button
        class="clients-carousel__arrow clients-carousel__arrow--left"
        @click="prev"
        aria-label="Anterior"
      >
        <img :src="arrowCarousel" alt="" class="clients-carousel__arrow-icon" />
      </button>

      <!-- Carousel Container -->
      <div
        class="clients-carousel__container"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          class="clients-carousel__track"
          :class="{ 'clients-carousel__track--no-transition': !isTransitioning }"
          :style="{ transform: getTranslateX() }"
          @transitionend="handleTransitionEnd"
        >
          <div
            v-for="(client, index) in extendedClients"
            :key="`${client.id}-${index}`"
            class="clients-carousel__card"
          >
            <img
              :src="client.image"
              :alt="client.alt"
              class="clients-carousel__image"
            />
          </div>
        </div>
      </div>

      <!-- Navigation Arrow Right -->
      <button
        class="clients-carousel__arrow clients-carousel__arrow--right"
        @click="next"
        aria-label="Próximo"
      >
        <img :src="arrowCarousel" alt="" class="clients-carousel__arrow-icon" />
      </button>
    </div>

  </section>
</template>
