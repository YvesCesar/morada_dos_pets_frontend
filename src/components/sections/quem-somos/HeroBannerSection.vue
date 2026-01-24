<script setup lang="ts">
import bannerQuemSomos from '@/assets/images/banner-quem-somos.png'

interface Props {
  /** Título principal do banner */
  title: string
  /** Subtítulo descritivo */
  subtitle: string
}

withDefaults(defineProps<Props>(), {
  title: 'Quem somos?',
  subtitle: 'Como tudo começou...',
})
</script>

<template>
  <section class="hero-banner">
    <div class="hero-banner__background">
      <img :src="bannerQuemSomos" alt="" class="hero-banner__image" />
      <div class="hero-banner__overlay"></div>
    </div>

    <div class="hero-banner__content">
      <h1 class="hero-banner__title">{{ title }}</h1>
      <p class="hero-banner__subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 533px;
  margin-top: 90px;
  overflow: hidden;
}

.hero-banner__background {
  position: absolute;
  inset: 0;
}

.hero-banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero-banner__overlay {
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

.hero-banner__content {
  position: absolute;
  top: 50%;
  left: 132px;
  transform: translateY(-50%);
  z-index: 1;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hero-banner__title {
  font-size: 48px;
  font-weight: var(--font-semibold);
  color: var(--color-white);
  line-height: 1.25;
  margin-bottom: 1.5rem;
}

.hero-banner__subtitle {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-white);
  line-height: 1.25;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-banner__content {
    left: 80px;
  }
}

@media (max-width: 992px) {
  .hero-banner {
    height: 450px;
  }

  .hero-banner__content {
    left: 40px;
  }

  .hero-banner__title {
    font-size: 36px;
  }

  .hero-banner__subtitle {
    font-size: var(--text-xl);
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 400px;
  }

  .hero-banner__content {
    left: 24px;
    right: 24px;
  }

  .hero-banner__title {
    font-size: 32px;
  }

  .hero-banner__subtitle {
    font-size: var(--text-lg);
  }
}

@media (max-width: 480px) {
  .hero-banner {
    height: 350px;
  }

  .hero-banner__content {
    left: 16px;
    right: 16px;
  }

  .hero-banner__title {
    font-size: 28px;
  }

  .hero-banner__subtitle {
    font-size: var(--text-base);
  }
}
</style>
