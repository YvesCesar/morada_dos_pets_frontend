<script setup lang="ts">
import fachada1 from '@/assets/images/fachada-1.png'
import fachada2 from '@/assets/images/fachada-2-14f599.png'

const units = [
  {
    image: fachada1,
    address: 'Rua Holanda, n° 125, Horizonte - AM',
    mapUrl: 'https://maps.google.com/?q=Rua+Holanda+125+Horizonte+AM'
  },
  {
    image: fachada2,
    address: 'Av. Flores, n° 86, São Bernardo - AM',
    mapUrl: 'https://maps.google.com/?q=Av+Flores+86+São+Bernardo+AM'
  }
]
</script>

<template>
  <section class="units">
    <div class="units__container">
      <h2 class="units__title">Conheça nossas unidades</h2>

      <div class="units__grid">
        <article v-for="unit in units" :key="unit.address" class="units__card">
          <div class="units__image-wrapper">
            <img :src="unit.image" :alt="unit.address" class="units__image" />
          </div>
          <div class="units__info">
            <p class="units__address">{{ unit.address }}</p>
            <a :href="unit.mapUrl" target="_blank" rel="noopener noreferrer" class="units__btn">
              Ver no mapa
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.units {
  padding: 5rem 0;
}

.units__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.units__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  margin-bottom: 3rem;
}

.units__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10rem;
}

.units__card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.units__image-wrapper {
  width: 100%;
  max-width: 484px;
  height: 313px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.units__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.units__card:hover .units__image {
  transform: scale(1.05);
}

.units__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.units__address {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25;
}

.units__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-sm);
  transition: opacity var(--transition-fast);
}

.units__btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1200px) {
  .units__grid {
    gap: 4rem;
  }
}

@media (max-width: 992px) {
  .units {
    padding: 4rem 0;
  }

  .units__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .units__title {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .units {
    padding: 3rem 0;
  }

  .units__title {
    font-size: var(--text-xl);
    margin-bottom: 2rem;
  }

  .units__image-wrapper {
    height: 250px;
  }

  .units__info {
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .units__image-wrapper {
    height: 200px;
  }

  .units__address {
    font-size: 1rem;
  }

  .units__btn {
    font-size: 1rem;
  }
}
</style>
