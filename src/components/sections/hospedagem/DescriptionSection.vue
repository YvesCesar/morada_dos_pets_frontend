<script setup lang="ts">
</script>

<template>
  <section class="hospedagem-description">
    <div class="hospedagem-description__container">
      <h2 class="hospedagem-description__title">Precisa sair e não quer deixar seu cachorro sozinho em casa?</h2>
      <p class="hospedagem-description__text">
        Oferecemos dois tipos de hospedagens para cães que combinam conforto, cuidado e diversão, por meio de ambientes 
        personalizados e recreativos, garantindo que o seu melhor amigo tenha uma estadia alegre e segura.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hospedagem-description {
  padding: 100px var(--container-padding) 50px;
  background-color: var(--color-white);
}

.hospedagem-description__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.hospedagem-description__title {
  font-size: 32px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
  margin-bottom: 40px;
  text-align: center;
}

.hospedagem-description__text {
  font-size: 24px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  text-align: left;
  max-width: 1208px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 992px) {
  .hospedagem-description {
    padding: 80px var(--container-padding) 40px;
  }

  .hospedagem-description__title {
    font-size: 28px;
  }

  .hospedagem-description__text {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .hospedagem-description {
    padding: 60px var(--container-padding) 30px;
  }

  .hospedagem-description__title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .hospedagem-description__text {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .hospedagem-description {
    padding: 50px var(--container-padding) 24px;
  }

  .hospedagem-description__title {
    font-size: 22px;
  }

  .hospedagem-description__text {
    font-size: 16px;
  }
}
</style>
