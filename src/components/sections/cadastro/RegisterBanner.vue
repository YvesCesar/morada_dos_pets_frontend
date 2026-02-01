<script setup lang="ts">
import bannerCadastro from '@/assets/images/cadastro/cadastro-banner-6366af.png'
</script>

<template>
  <section class="register-banner">
    <div class="register-banner__background">
      <img :src="bannerCadastro" alt="Pets na Morada dos Pets" class="register-banner__image" />
      <div class="register-banner__overlay"></div>
    </div>

    <div class="register-banner__content">
      <h1 class="register-banner__title">Que bom ter você aqui!</h1>
    </div>
  </section>
</template>

<style scoped>
.register-banner {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.register-banner__background {
  position: absolute;
  inset: 0;
}

.register-banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.register-banner__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(86, 86, 86, 1) 0%,
    rgba(91, 91, 91, 0.96) 4%,
    rgba(10, 9, 9, 0.67) 41%,
    rgba(113, 110, 110, 0.72) 75%,
    rgba(217, 217, 217, 0) 100%
  );
}

.register-banner__content {
  position: absolute;
  top: 214px;
  left: var(--container-padding);
  z-index: 1;
}

.register-banner__title {
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  line-height: 1.25;
  max-width: 365px;
}

@media (max-width: 1200px) {
  .register-banner__content {
    top: 150px;
  }

  .register-banner__title {
    font-size: var(--text-3xl);
    max-width: 300px;
  }
}

@media (max-width: 992px) {
  .register-banner {
    position: relative;
    top: 0;
    min-height: 300px;
  }

  .register-banner__content {
    top: 50%;
    transform: translateY(-50%);
  }

  .register-banner__title {
    font-size: var(--text-2xl);
    max-width: 250px;
  }
}

@media (max-width: 768px) {
  .register-banner {
    min-height: 250px;
  }

  .register-banner__title {
    font-size: var(--text-xl);
    max-width: 200px;
  }
}
</style>
