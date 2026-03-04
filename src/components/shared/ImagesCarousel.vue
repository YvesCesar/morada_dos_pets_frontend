<script setup lang="ts">
import type { ClientImage } from '@/types'
import { computed } from 'vue'
import { useViewport, useInfiniteCarousel, useSwipe } from '@/composables'
import { CAROUSEL_CONFIG, CAROUSEL_BREAKPOINTS } from '@/config/carousel'
import arrowCarousel from '@/assets/images/arrow-carousel.svg'

interface Props {
  images: ClientImage[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Conheça alguns dos nossos clientes',
})

// Composables
const { isMobile, width } = useViewport()

const {
  currentIndex,
  extendedItems: extendedImages,
  isTransitioning,
  next,
  prev,
  handleTransitionEnd,
} = useInfiniteCarousel(props.images)

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
  <section class="images-carousel">
    <div v-if="title" class="images-carousel__header">
      <h2 class="images-carousel__title">{{ title }}</h2>
    </div>

    <div class="images-carousel__wrapper">
      <!-- Navigation Arrow Left -->
      <button
        class="images-carousel__arrow images-carousel__arrow--left"
        @click="prev"
        aria-label="Anterior"
      >
        <img :src="arrowCarousel" alt="" class="images-carousel__arrow-icon" />
      </button>

      <!-- Carousel Container -->
      <div
        class="images-carousel__container"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          class="images-carousel__track"
          :class="{ 'images-carousel__track--no-transition': !isTransitioning }"
          :style="{ transform: getTranslateX() }"
          @transitionend="handleTransitionEnd"
        >
          <div
            v-for="(image, index) in extendedImages"
            :key="`${image.id}-${index}`"
            class="images-carousel__card"
          >
            <img
              :src="image.image"
              :alt="image.alt"
              class="images-carousel__image"
            />
          </div>
        </div>
      </div>

      <!-- Navigation Arrow Right -->
      <button
        class="images-carousel__arrow images-carousel__arrow--right"
        @click="next"
        aria-label="Próximo"
      >
        <img :src="arrowCarousel" alt="" class="images-carousel__arrow-icon" />
      </button>
    </div>
  </section>
</template>
