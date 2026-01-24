<script setup lang="ts">
import { ref, computed } from 'vue'
import clienteImg from '@/assets/images/testemunho-cliente.png'
import arrowCarousel from '@/assets/images/arrow-carousel.svg'

interface Testimonial {
  id: number
  image: string
  quote: string
  author: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: clienteImg,
    quote:
      'Eu deixei meu cãozinho no hotel e fiquei muito satisfeita com o serviço prestado. Os funcionários foram super atenciosos e meu cachorro se divertiu muito durante todo o dia. Foi ótimo poder ter essa opção para cuidar do meu pet enquanto eu estava no trabalho. Recomendo!',
    author: 'Cley Celeste'
  },
  {
    id: 2,
    image: clienteImg,
    quote:
      'Melhor hotel para pets de Manaus! Deixei minha cachorrinha por uma semana e ela voltou super feliz. A equipe é incrível e muito carinhosa. Com certeza voltarei!',
    author: 'Maria Santos'
  },
  {
    id: 3,
    image: clienteImg,
    quote:
      'Atendimento excelente e ambiente muito acolhedor. Meu pet foi muito bem cuidado. Recomendo a todos que precisam de um lugar seguro para deixar seus animais.',
    author: 'João Silva'
  }
]

const currentIndex = ref(0)

const currentTestimonial = computed(() => testimonials[currentIndex.value]!)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

// Touch/Swipe handling for mobile
const touchStartX = ref(0)
const touchEndX = ref(0)
const minSwipeDistance = 50

const handleTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0]
  if (!touch) return
  touchStartX.value = touch.clientX
}

const handleTouchMove = (e: TouchEvent) => {
  const touch = e.touches[0]
  if (!touch) return
  touchEndX.value = touch.clientX
}

const handleTouchEnd = () => {
  // Verifica se houve interação válida
  if (touchStartX.value === 0) return

  const swipeDistance = touchStartX.value - touchEndX.value

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe left - next slide
      nextSlide()
    } else {
      // Swipe right - previous slide
      prevSlide()
    }
  }

  // Reset values
  touchStartX.value = 0
  touchEndX.value = 0
}
</script>

<template>
  <section class="testimonials">
    <!-- Navigation Arrow Left (outside container) -->
    <button
      class="testimonials__arrow testimonials__arrow--left"
      @click="prevSlide"
      aria-label="Depoimento anterior"
    >
      <img :src="arrowCarousel" alt="" class="testimonials__arrow-icon" />
    </button>

    <!-- Navigation Arrow Right (outside container) -->
    <button
      class="testimonials__arrow testimonials__arrow--right"
      @click="nextSlide"
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
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="testimonials__dot"
          :class="{ 'testimonials__dot--active': index === currentIndex }"
          :aria-label="`Ir para depoimento ${index + 1}`"
          @click="goToSlide(index)"
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
