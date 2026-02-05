<script setup lang="ts">
import bannerDogTaxi from '@/assets/images/dog-taxi/dog-taxi-banner-7e2c93.png'
</script>

<template>
  <section class="hero-banner-dog-taxi">
    <div class="hero-banner-dog-taxi__background">
      <img :src="bannerDogTaxi" alt="" class="hero-banner-dog-taxi__image" />
      <div class="hero-banner-dog-taxi__overlay"></div>
    </div>

    <div class="hero-banner-dog-taxi__content">
      <h1 class="hero-banner-dog-taxi__title">Dog Táxi</h1>
      <p class="hero-banner-dog-taxi__subtitle">
        Transporte seguro e conveniente para o seu melhor amigo
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero-banner-dog-taxi {
  position: relative;
  width: 100%;
  height: 530px;
  margin-top: 90px;
  overflow: hidden;
}

.hero-banner-dog-taxi__background {
  position: absolute;
  inset: 0;
}

.hero-banner-dog-taxi__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero-banner-dog-taxi__overlay {
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

.hero-banner-dog-taxi__content {
  position: absolute;
  top: 50%;
  left: var(--container-padding);
  transform: translateY(-50%);
  z-index: 1;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hero-banner-dog-taxi__title {
  font-size: 48px;
  font-weight: var(--font-semibold);
  color: var(--color-white);
  line-height: 1.25em;
  margin-bottom: 25px;
}

.hero-banner-dog-taxi__subtitle {
  font-size: 32px;
  font-weight: var(--font-medium);
  color: var(--color-white);
  line-height: 1.25em;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-banner-dog-taxi__content {
    left: 80px;
  }
}

@media (max-width: 992px) {
  .hero-banner-dog-taxi {
    height: 450px;
  }

  .hero-banner-dog-taxi__title {
    font-size: 40px;
  }

  .hero-banner-dog-taxi__subtitle {
    font-size: 26px;
  }
}

@media (max-width: 768px) {
  .hero-banner-dog-taxi {
    height: 400px;
  }

  .hero-banner-dog-taxi__content {
    left: var(--container-padding);
  }

  .hero-banner-dog-taxi__title {
    font-size: 32px;
  }

  .hero-banner-dog-taxi__subtitle {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .hero-banner-dog-taxi {
    height: 350px;
  }

  .hero-banner-dog-taxi__title {
    font-size: 28px;
  }

  .hero-banner-dog-taxi__subtitle {
    font-size: 18px;
  }
}
</style>
