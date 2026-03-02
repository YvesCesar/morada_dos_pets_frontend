<script setup lang="ts">
import { computed } from 'vue'
import arrowCarousel from '@/assets/images/arrow-carousel.svg'
import { testimonials as staticTestimonials } from '@/data'
import { useTestimonialsStore } from '@/stores/testimonials'
import { useCarousel, useSwipe } from '@/composables'

const testimonialsStore = useTestimonialsStore()

const activeTestimonials = computed(() =>
  testimonialsStore.publicCarouselItems.length > 0
    ? testimonialsStore.publicCarouselItems
    : staticTestimonials,
)

const { currentIndex, currentItem: currentTestimonial, next, prev, goTo } = useCarousel(activeTestimonials)

const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
  onSwipeLeft: next,
  onSwipeRight: prev,
})
</script>

<template>
  <section class="testimonials">
    <!-- Navigation Arrow Left (outside container) -->
    <button
      class="testimonials__arrow testimonials__arrow--left"
      @click="prev"
      aria-label="Depoimento anterior"
    >
      <img :src="arrowCarousel" alt="" class="testimonials__arrow-icon" />
    </button>

    <!-- Navigation Arrow Right (outside container) -->
    <button
      class="testimonials__arrow testimonials__arrow--right"
      @click="next"
      aria-label="Próximo depoimento"
    >
      <img :src="arrowCarousel" alt="" class="testimonials__arrow-icon" />
    </button>

    <div class="testimonials__container">
      <h2 class="testimonials__title">Veja o que os nossos clientes têm a dizer</h2>

      <div
        class="testimonials__carousel"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="testimonials__content">
          <!-- Image -->
          <div class="testimonials__image-wrapper">
            <img
              :src="currentTestimonial.image"
              :alt="currentTestimonial.author"
              class="testimonials__image"
            />
          </div>

          <!-- Quote -->
          <div class="testimonials__quote-wrapper">
            <blockquote class="testimonials__quote">
              <span class="testimonials__quote-mark testimonials__quote-mark--open">“</span>
              <p class="testimonials__quote-text">{{ currentTestimonial.quote }}</p>
              <span class="testimonials__quote-mark testimonials__quote-mark--close">”</span>
            </blockquote>
            <cite class="testimonials__author">— {{ currentTestimonial.author }}</cite>
          </div>
        </div>
      </div>

      <!-- Pagination dots -->
      <div class="testimonials__pagination">
        <button
          v-for="(testimonial, index) in activeTestimonials"
          :key="testimonial.id"
          class="testimonials__dot"
          :class="{ 'testimonials__dot--active': index === currentIndex }"
          :aria-label="`Ir para depoimento ${index + 1}`"
          @click="goTo(index)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  position: relative;
  background: linear-gradient(180deg, rgba(41, 16, 0, 1) 1%, rgba(41, 16, 0, 0.91) 93%);
  padding: 2rem 0 4rem;
}

.testimonials__arrow {
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

.testimonials__arrow:hover {
  opacity: 0.8;
}

.testimonials__arrow--left {
  left: 0;
}

.testimonials__arrow--right {
  right: 0;
  transform: translateY(-50%) rotate(180deg);
}

.testimonials__arrow-icon {
  width: 63px;
  height: 65px;
}

.testimonials__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.testimonials__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-white);
  text-align: center;
  margin-bottom: 3rem;
}

.testimonials__carousel {
  display: flex;
  align-items: center;
}

.testimonials__content {
  display: grid;
  grid-template-columns: 473px 1fr;
  gap: 5rem;
  align-items: center;
  flex: 1;
}

.testimonials__image-wrapper {
  border-radius: var(--radius-md);
  overflow: hidden;
  height: 265px;
}

.testimonials__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials__quote-wrapper {
  position: relative;
  padding: 0;
}

.testimonials__quote {
  position: relative;
  margin-bottom: 1.5rem;
}

.testimonials__quote-mark {
  font-family: 'Quicksand', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 96px;
  line-height: 120px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.25);
  position: absolute;
  user-select: none;
}

.testimonials__quote-mark--open {
  top: -30px;
  left: 0;
}

.testimonials__quote-mark--close {
  bottom: -70px;
  right: 0;
}

.testimonials__quote-text {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-white);
  line-height: 1.25;
  padding: 20px 30px;
  position: relative;
  z-index: 1;
}

.testimonials__author {
  display: block;
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  font-style: normal;
  color: var(--color-white);
}

.testimonials__pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.testimonials__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.testimonials__dot--active {
  background-color: var(--color-white);
}

.testimonials__dot:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

/* Responsive */
@media (max-width: 1200px) {
  .testimonials__content {
    grid-template-columns: 380px 1fr;
    gap: 3rem;
  }

  .testimonials__quote-mark {
    font-size: 80px;
    line-height: 100px;
  }

  .testimonials__arrow-icon {
    width: 50px;
    height: 52px;
  }
}

@media (max-width: 992px) {
  .testimonials {
    padding: 3rem 0;
  }

  .testimonials__carousel {
    flex-direction: column;
    gap: 1.5rem;
  }

  .testimonials__arrow {
    display: none;
  }

  .testimonials__content {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .testimonials__image-wrapper {
    height: 300px;
    max-width: 450px;
    margin: 0 auto;
  }

  .testimonials__quote-wrapper {
    text-align: center;
  }

  .testimonials__quote-mark {
    display: none;
  }

  .testimonials__quote-text {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .testimonials__title {
    font-size: var(--text-xl);
    margin-bottom: 2rem;
  }

  .testimonials__image-wrapper {
    height: 250px;
  }

  .testimonials__quote-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .testimonials__image-wrapper {
    height: 200px;
  }
}
</style>
