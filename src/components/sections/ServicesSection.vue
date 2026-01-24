<script setup lang="ts">
import { services } from '@/data'
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
        
        <!-- Hover Content -->
        <div class="services__hover-content">
          <h3 class="services__hover-title">{{ service.title }}</h3>
          <p class="services__hover-description">{{ service.description }}</p>
          <button class="services__hover-btn">Saiba mais</button>
        </div>
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

@media (max-width: 768px) {
  .services__header {
    text-align: left;
  }
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
  opacity: 1;
  transition: opacity var(--transition-base);
}

.services__card-title {
  position: absolute;
  top: 286px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Quicksand', sans-serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.25em;
  color: var(--color-white);
  text-align: center;
  z-index: 1;
  transition: opacity var(--transition-base);
}

.services__card:hover .services__card-title {
  opacity: 0;
}

/* Hover Content */
.services__hover-content {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  width: 300px;
  text-align: center;
  z-index: 2;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.services__card:hover .services__hover-content {
  opacity: 1;
}

.services__hover-title {
  font-family: 'Quicksand', sans-serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.25em;
  color: var(--color-white);
}

.services__hover-description {
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.25em;
  color: var(--color-white);
  min-height: 120px;
  display: flex;
  align-items: center;
}

.services__hover-btn {
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.25em;
  color: var(--color-white);
  background: var(--color-primary);
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.services__hover-btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1200px) {
  .services__card {
    height: 450px;
  }

  .services__card-title {
    top: 220px;
    font-size: 32px;
  }

  .services__hover-content {
    top: 100px;
    gap: 30px;
    width: 250px;
  }

  .services__hover-title {
    font-size: 32px;
  }

  .services__hover-description {
    font-size: 16px;
    min-height: 100px;
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
    top: 170px;
    font-size: 28px;
  }

  .services__hover-content {
    top: 60px;
    gap: 24px;
    width: 80%;
    max-width: 400px;
  }

  .services__hover-title {
    font-size: 28px;
  }

  .services__hover-description {
    font-size: 14px;
    min-height: auto;
  }

  .services__hover-btn {
    font-size: 16px;
    padding: 6px 20px;
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

  .services__card-title {
    top: 130px;
    font-size: 24px;
  }

  .services__hover-content {
    top: 40px;
    gap: 16px;
  }

  .services__hover-title {
    font-size: 24px;
  }

  .services__hover-description {
    font-size: 13px;
  }

  .services__hover-btn {
    font-size: 14px;
    padding: 6px 16px;
  }
}

@media (max-width: 480px) {
  .services__card {
    height: 220px;
  }

  .services__card-title {
    top: 100px;
    font-size: 20px;
  }

  .services__hover-content {
    top: 20px;
    gap: 12px;
    width: 90%;
  }

  .services__hover-title {
    font-size: 20px;
  }

  .services__hover-description {
    font-size: 12px;
    line-height: 1.3em;
  }

  .services__hover-btn {
    font-size: 12px;
    padding: 5px 14px;
  }
}
</style>
