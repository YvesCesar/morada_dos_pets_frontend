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
