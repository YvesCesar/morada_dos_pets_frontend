<script setup lang="ts">
import dogSpa from '@/assets/images/dog-spa.png'
import hospedagem from '@/assets/images/hospedagem.png'
import dogTaxi from '@/assets/images/dog-taxi.png'

const services = [
  {
    image: dogSpa,
    title: 'Dog Spa',
    alt: 'Cachorro no spa'
  },
  {
    image: hospedagem,
    title: 'Hospedagem',
    alt: 'Cachorro na hospedagem'
  },
  {
    image: dogTaxi,
    title: 'Dog Táxi',
    alt: 'Cachorro no táxi'
  }
]
</script>

<template>
  <section id="servicos" class="services">
    <div class="services__header">
      <h2 class="services__title">Nossos serviços</h2>
      <p class="services__subtitle">
        Conheça os serviços que preparamos especialmente para cuidar do seu melhor amigo
      </p>
    </div>

    <div class="services__grid">
      <article v-for="service in services" :key="service.title" class="services__card">
        <img :src="service.image" :alt="service.alt" class="services__image" />
        <div class="services__overlay"></div>
        <h3 class="services__card-title">{{ service.title }}</h3>
      </article>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: 4rem 0;
}

.services__header {
  text-align: center;
  max-width: var(--container-max);
  margin: 0 auto 3rem;
  padding: 0 var(--container-padding);
}

.services__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  margin-bottom: 1rem;
}

.services__subtitle {
  font-size: var(--text-xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}

.services__card {
  position: relative;
  height: 553px;
  overflow: hidden;
  cursor: pointer;
}

.services__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.services__card:hover .services__image {
  transform: scale(1.05);
}

.services__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(91, 91, 91, 0.96) 1%,
    rgba(86, 86, 86, 1) 4%,
    rgba(10, 9, 9, 0.67) 41%,
    rgba(113, 110, 110, 0.72) 75%,
    rgba(217, 217, 217, 0) 100%
  );
  transition: opacity var(--transition-base);
}

.services__card:hover .services__overlay {
  opacity: 0.8;
}

.services__card-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  text-align: center;
  z-index: 1;
}

/* Responsive */
@media (max-width: 1200px) {
  .services__card {
    height: 450px;
  }
}

@media (max-width: 992px) {
  .services__grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 var(--container-padding);
    gap: 1.5rem;
  }

  .services__card {
    height: 350px;
    border-radius: var(--radius-md);
  }

  .services__card-title {
    font-size: var(--text-2xl);
  }
}

@media (max-width: 768px) {
  .services {
    padding: 3rem 0;
  }

  .services__title {
    font-size: var(--text-xl);
  }

  .services__subtitle {
    font-size: var(--text-base);
  }

  .services__card {
    height: 280px;
  }
}

@media (max-width: 480px) {
  .services__card {
    height: 220px;
  }

  .services__card-title {
    font-size: var(--text-lg);
  }
}
</style>
