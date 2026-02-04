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

<style scoped>
.images-carousel {
  background: var(--color-white);
  padding: 3rem 0 4rem;
  overflow-x: hidden;
  overflow-y: visible;
}

.images-carousel__header {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  margin-bottom: 2rem;
}

.images-carousel__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

.images-carousel__wrapper {
  position: relative;
  width: 100%;
  height: 307px;
  padding-top: 14px;
  padding-bottom: 24px;
  overflow: visible;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
  box-sizing: border-box;
}

.images-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 0;
  transition: opacity var(--transition-fast);
}

.images-carousel__arrow:hover {
  opacity: 0.8;
}

.images-carousel__arrow--left {
  left: 113px;
}

.images-carousel__arrow--right {
  right: 102px;
  transform: translateY(-50%) rotate(180deg);
}

.images-carousel__arrow-icon {
  width: 63px;
  height: 65px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}

.images-carousel__container {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
}

.images-carousel__track {
  display: flex;
  gap: 9px;
  transition: transform 0.4s ease;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
}

.images-carousel__track--no-transition {
  transition: none;
}

.images-carousel__card {
  flex-shrink: 0;
  width: 407px;
  height: 307px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0s;
  cursor: pointer;
}

.images-carousel__card:hover {
  transform: scale(1.09) translateY(-14px);
  z-index: 10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.images-carousel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 1400px) {
  .images-carousel__card {
    width: 350px;
    height: 264px;
  }

  .images-carousel__card:hover {
    transform: scale(1.09) translateY(-12px);
  }

  .images-carousel__wrapper {
    height: 264px;
    padding-top: 12px;
    padding-bottom: 20px;
  }
}

@media (max-width: 1200px) {
  .images-carousel__card {
    width: 300px;
    height: 226px;
  }

  .images-carousel__card:hover {
    transform: scale(1.09) translateY(-10px);
  }

  .images-carousel__wrapper {
    height: 226px;
  }

  .images-carousel__arrow--left {
    left: 60px;
  }

  .images-carousel__arrow--right {
    right: 50px;
  }

  .images-carousel__arrow-icon {
    width: 50px;
    height: 52px;
  }
}

@media (max-width: 992px) {
  .images-carousel__card {
    width: 260px;
    height: 196px;
  }

  .images-carousel__card:hover {
    transform: scale(1.09) translateY(-8px);
  }

  .images-carousel__wrapper {
    height: 196px;
  }

  .images-carousel__arrow--left {
    left: 30px;
  }

  .images-carousel__arrow--right {
    right: 20px;
  }

  .images-carousel__arrow-icon {
    width: 40px;
    height: 42px;
  }
}

@media (max-width: 768px) {
  .images-carousel {
    padding: 2rem 0 3rem;
  }

  .images-carousel__wrapper {
    height: auto;
    padding: 0 var(--container-padding);
  }

  .images-carousel__arrow {
    display: none;
  }

  .images-carousel__track {
    gap: 0;
  }

  .images-carousel__card {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
  }

  .images-carousel__title {
    font-size: var(--text-xl);
  }
}
</style>
