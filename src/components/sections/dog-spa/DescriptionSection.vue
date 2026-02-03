<script setup lang="ts">
</script>

<template>
  <section class="dog-spa-description">
    <div class="dog-spa-description__container">
      <h2 class="dog-spa-description__title">Seu cão precisa de um dia no spa?</h2>
      <p class="dog-spa-description__text">
        A Morada dos Pets possui um luxuoso Dog Spa, onde seu fiel companheiro pode desfrutar de
        momentos de puro relaxamento e mimos especiais. Oferecemos serviços como:
      </p>
    </div>
  </section>
</template>

<style scoped>
.dog-spa-description {
  padding: 100px var(--container-padding) 60px;
  background-color: var(--color-white);
}

.dog-spa-description__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.dog-spa-description__title {
  font-size: 32px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
  margin-bottom: 40px;
  text-align: center;
}

.dog-spa-description__text {
  font-size: 24px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  text-align: left;
  max-width: 1189px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 992px) {
  .dog-spa-description {
    padding: 80px var(--container-padding) 50px;
  }

  .dog-spa-description__title {
    font-size: 28px;
  }

  .dog-spa-description__text {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .dog-spa-description {
    padding: 60px var(--container-padding) 40px;
  }

  .dog-spa-description__title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .dog-spa-description__text {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .dog-spa-description {
    padding: 50px var(--container-padding) 30px;
  }

  .dog-spa-description__title {
    font-size: 22px;
  }

  .dog-spa-description__text {
    font-size: 16px;
  }
}
</style>
