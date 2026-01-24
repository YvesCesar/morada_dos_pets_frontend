<script setup lang="ts">
import bannerServicos from '@/assets/images/banner-servicos-5b3a07.png'
</script>

<template>
  <section class="hero-banner-servicos">
    <div class="hero-banner-servicos__background">
      <img :src="bannerServicos" alt="" class="hero-banner-servicos__image" />
      <div class="hero-banner-servicos__overlay"></div>
    </div>

    <div class="hero-banner-servicos__content">
      <h1 class="hero-banner-servicos__title">
        Conheça nossos<br />serviços
      </h1>
    </div>
  </section>
</template>

<style scoped>
.hero-banner-servicos {
  position: relative;
  width: 100%;
  height: 530px;
  margin-top: 90px;
  overflow: hidden;
}

.hero-banner-servicos__background {
  position: absolute;
  inset: 0;
}

.hero-banner-servicos__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero-banner-servicos__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(86, 86, 86, 1) 2%,
    rgba(91, 91, 91, 0.96) 4%,
    rgba(10, 9, 9, 0.67) 41%,
    rgba(113, 110, 110, 0.72) 100%,
    rgba(217, 217, 217, 0) 100%
  );
}

.hero-banner-servicos__content {
  position: absolute;
  top: 50%;
  left: var(--container-padding);
  transform: translateY(-50%);
  z-index: 1;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hero-banner-servicos__title {
  font-size: 48px;
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: 0.95;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-banner-servicos__content {
    left: 80px;
  }
}

@media (max-width: 992px) {
  .hero-banner-servicos {
    height: 450px;
  }

  .hero-banner-servicos__title {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .hero-banner-servicos {
    height: 400px;
  }

  .hero-banner-servicos__content {
    left: var(--container-padding);
  }

  .hero-banner-servicos__title {
    font-size: 32px;
  }
}

@media (max-width: 480px) {
  .hero-banner-servicos {
    height: 350px;
  }

  .hero-banner-servicos__title {
    font-size: 28px;
  }
}
</style>
