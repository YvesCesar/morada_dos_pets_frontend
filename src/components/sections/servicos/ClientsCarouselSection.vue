<script setup lang="ts">


import { ref, computed, onMounted, onUnmounted } from 'vue'
import arrowCarousel from '@/assets/images/arrow-carousel.svg'
import { useSwipe } from '@/composables'
import { useCarousel } from '@/composables/useCarousel'
import { clients } from '@/data/clients'



// Triplica o array para efeito visual infinito
const extendedClients = computed(() => [...clients, ...clients, ...clients])
const groupSize = clients.length
const offset = groupSize // início do grupo do meio

// useCarousel controla o índice do carrossel visual
const { currentIndex, next, prev } = useCarousel(extendedClients.value, { initialIndex: offset, loop: true })

const isMobile = ref(false)
const isTransitioning = ref(true)
const cardWidth = 407
const gap = 9

const checkViewport = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkViewport()
  window.addEventListener('resize', checkViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkViewport)
})

const getTranslateX = () => {
  if (isMobile.value) {
    return `translateX(-${currentIndex.value * 100}%)`
  }
  return `translateX(-${currentIndex.value * (cardWidth + gap)}px)`
}

// Efeito infinito real: teleporta para o grupo do meio ao chegar nas bordas
const handleTransitionEnd = () => {
  if (currentIndex.value >= groupSize * 2) {
    isTransitioning.value = false
    currentIndex.value = offset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
      })
    })
  } else if (currentIndex.value < groupSize) {
    isTransitioning.value = false
    currentIndex.value = offset + (currentIndex.value % groupSize)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
      })
    })
  }
}

const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
  onSwipeLeft: next,
  onSwipeRight: prev,
})
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
          ref="trackRef"
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

    <!-- Mobile Pagination Dots -->
    <div v-if="isMobile" class="clients-carousel__pagination">
      <button
        v-for="(client, index) in clients"
        :key="client.id"
        class="clients-carousel__dot"
        :class="{ 'clients-carousel__dot--active': ((currentIndex - offset + groupSize) % groupSize) === index }"
        :aria-label="`Ir para cliente ${index + 1}`"
        @click="currentIndex = offset + index"
      />
    </div>
  </section>
</template>

<style scoped>
.clients-carousel {
  background: var(--color-white);
  padding: 3rem 0 4rem;
  overflow: hidden;
}

.clients-carousel__header {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  margin-bottom: 2rem;
}

.clients-carousel__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

.clients-carousel__wrapper {
  position: relative;
  width: 100%;
  height: 307px;
}

.clients-carousel__arrow {
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

.clients-carousel__arrow:hover {
  opacity: 0.8;
}

.clients-carousel__arrow--left {
  left: 113px;
}

.clients-carousel__arrow--right {
  right: 102px;
  transform: translateY(-50%) rotate(180deg);
}

.clients-carousel__arrow-icon {
  width: 63px;
  height: 65px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}

.clients-carousel__container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.clients-carousel__track {
  display: flex;
  gap: 9px;
  transition: transform 0.4s ease;
  height: 100%;
}

.clients-carousel__track--no-transition {
  transition: none;
}

.clients-carousel__card {
  flex-shrink: 0;
  width: 407px;
  height: 307px;
  border-radius: 10px;
  overflow: hidden;
}

.clients-carousel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.clients-carousel__pagination {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.clients-carousel__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-text-muted);
  border: none;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.clients-carousel__dot--active {
  background: var(--color-primary);
}

/* Responsive */
@media (max-width: 1400px) {
  .clients-carousel__arrow--left {
    left: 20px;
  }

  .clients-carousel__arrow--right {
    right: 20px;
  }

  .clients-carousel__card {
    width: 350px;
    height: 264px;
  }

  .clients-carousel__wrapper {
    height: 264px;
  }
}

@media (max-width: 1200px) {
  .clients-carousel__card {
    width: 300px;
    height: 226px;
  }

  .clients-carousel__wrapper {
    height: 226px;
  }

  .clients-carousel__arrow-icon {
    width: 50px;
    height: 52px;
  }
}

@media (max-width: 992px) {
  .clients-carousel__wrapper {
    height: 200px;
  }

  .clients-carousel__card {
    width: 260px;
    height: 200px;
  }

  .clients-carousel__arrow-icon {
    width: 45px;
    height: 47px;
  }
}

@media (max-width: 768px) {
  .clients-carousel {
    padding: 2rem 0 3rem;
  }

  .clients-carousel__title {
    font-size: var(--text-xl);
  }

  .clients-carousel__wrapper {
    padding: 0 var(--container-padding);
    height: 250px;
  }

  .clients-carousel__arrow {
    display: none;
  }

  .clients-carousel__track {
    gap: 0;
  }

  .clients-carousel__card {
    width: 100%;
    flex-shrink: 0;
    height: 250px;
  }
}

@media (max-width: 480px) {
  .clients-carousel__wrapper {
    height: 220px;
  }

  .clients-carousel__card {
    height: 220px;
  }

  .clients-carousel__title {
    font-size: var(--text-lg);
  }
}
</style>
