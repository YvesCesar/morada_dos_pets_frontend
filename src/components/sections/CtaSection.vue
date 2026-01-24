<script setup lang="ts">
import ilustracaoPets from '@/assets/images/ilustracao-pets.svg'
</script>

<template>
  <section class="cta">
    <div class="cta__container">
      <h2 class="cta__title">Venha fazer parte da Morada dos Pets também!</h2>

      <div class="cta__illustration">
        <img :src="ilustracaoPets" alt="Ilustração de pets" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: 4rem 0;
}

.cta__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.cta__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
  max-width: 510px;
}

.cta__illustration {
  display: flex;
  justify-content: flex-end;
}

.cta__illustration img {
  max-width: 459px;
  height: auto;
}

/* Responsive */
@media (max-width: 992px) {
  .cta__container {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .cta__title {
    margin: 0;
  }

  .cta__illustration {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .cta {
    padding: 3rem 0;
  }

  .cta__title {
    font-size: var(--text-xl);
  }

  .cta__illustration img {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .cta__illustration img {
    max-width: 250px;
  }
}
</style>
