<script setup lang="ts">
import { missionVisionValues } from '@/data'
</script>

<template>
  <section class="mission">
    <div class="mission__container">
      <div v-for="item in missionVisionValues" :key="item.title" class="mission__card">
        <img :src="item.icon" :alt="item.title" class="mission__icon" />
        <h3 class="mission__title">{{ item.title }}</h3>
        <p class="mission__description">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission {
  background-color: var(--color-secondary);
  padding: 5rem 0;
}

.mission__container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6rem;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 calc(var(--container-padding) + 3rem);
}

.mission__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mission__icon {
  width: 75px;
  height: 82px;
  margin-bottom: 1rem;
  object-fit: contain;
}

.mission__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.mission__description {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-primary);
  line-height: 1.25;
  max-width: 303px;
}

/* Responsive */
@media (max-width: 1200px) {
  .mission__container {
    gap: 3rem;
    padding: 0 var(--container-padding);
  }
}

@media (max-width: 992px) {
  .mission {
    padding: 4rem 0;
  }

  .mission__container {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  .mission__card:last-child {
    grid-column: span 2;
    justify-self: center;
  }
}

@media (max-width: 768px) {
  .mission {
    padding: 3rem 0;
  }

  .mission__container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .mission__card:last-child {
    grid-column: auto;
  }

  .mission__icon {
    width: 60px;
    height: 66px;
  }

  .mission__title {
    font-size: var(--text-lg);
  }

  .mission__description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .mission {
    padding: 2.5rem 0;
  }

  .mission__container {
    gap: 2rem;
  }

  .mission__icon {
    width: 50px;
    height: 55px;
  }
}
</style>
