<script setup lang="ts">
import ilustracaoCachorro from '@/assets/images/ilustracao-cachorro-servicos.svg'
</script>

<template>
  <section class="dedication">
    <div class="dedication__container">
      <div class="dedication__content">
        <h2 class="dedication__title">Dedicação total ao seu melhor amigo!</h2>
      </div>
      <div class="dedication__illustration">
        <img
          :src="ilustracaoCachorro"
          alt="Ilustração de cachorro"
          class="dedication__image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.dedication {
  background: var(--color-white);
  padding: 4rem 0;
}

.dedication__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.dedication__content {
  display: flex;
  align-items: center;
}

.dedication__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

.dedication__illustration {
  display: flex;
  justify-content: flex-end;
}

.dedication__image {
  max-width: 100%;
  height: auto;
  width: 510px;
}

/* Responsive */
@media (max-width: 992px) {
  .dedication__container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .dedication__content {
    justify-content: center;
  }

  .dedication__illustration {
    justify-content: center;
    order: -1;
  }

  .dedication__image {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .dedication {
    padding: 3rem 0;
  }

  .dedication__title {
    font-size: var(--text-xl);
  }

  .dedication__image {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .dedication {
    padding: 2rem 0;
  }

  .dedication__title {
    font-size: var(--text-lg);
  }
}
</style>
