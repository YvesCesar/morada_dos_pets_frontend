<script setup lang="ts">
import ServicesCards from '@/components/shared/ServicesCards.vue'
</script>

<template>
  <section id="servicos" class="services">
    <div class="services__header">
      <h2 class="services__title">Nossos serviços</h2>
      <p class="services__subtitle">
        Conheça os serviços que preparamos especialmente para cuidar do seu melhor amigo
      </p>
    </div>

    <ServicesCards />
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

  .services {
    padding: 3rem 0;
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

@media (max-width: 768px) {
  .services__title {
    font-size: var(--text-xl);
  }

  .services__subtitle {
    font-size: var(--text-base);
  }
}
</style>
