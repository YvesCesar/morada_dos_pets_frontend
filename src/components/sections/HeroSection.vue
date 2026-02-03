<script setup lang="ts">
import bannerHero from '@/assets/images/banner-hero.png'
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero__background">
      <img :src="bannerHero" alt="Cachorro feliz" class="hero__image" />
      <div class="hero__overlay"></div>
    </div>

    <div class="hero__content">
      <h1 class="hero__title">
        Onde a diversão e o<br />
        cuidado andam juntos.
      </h1>
    </div>

    <router-link to="/servicos" class="hero__cta">Saiba mais</router-link>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 533px;
  margin-top: 90px;
  overflow: hidden;
}

.hero__background {
  position: absolute;
  inset: 0;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(41, 16, 0, 0.5) 0%,
    rgba(41, 16, 0, 0.5) 25%,
    rgba(41, 16, 0, 0.5) 50%,
    rgba(219, 185, 71, 0.5) 75%,
    rgba(217, 217, 217, 0) 100%
  );
}

.hero__content {
  position: absolute;
  top: 224px;
  left: 132px;
  z-index: 1;
}

.hero__title {
  font-size: 48px;
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: 0.95;
}

.hero__cta {
  position: absolute;
  top: 422px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.hero__cta:hover {
  opacity: 0.9;
  transform: translateX(-50%) translateY(-2px);
}

/* Responsive */
@media (max-width: 1200px) {
  .hero__content {
    left: 80px;
  }
}

@media (max-width: 992px) {
  .hero {
    height: 450px;
  }

  .hero__content {
    left: 40px;
    top: 180px;
  }

  .hero__title {
    font-size: 36px;
  }

  .hero__cta {
    top: 350px;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 400px;
  }

  .hero__content {
    left: 24px;
    top: 140px;
  }

  .hero__title {
    font-size: 28px;
  }

  .hero__cta {
    top: 300px;
  }
}

@media (max-width: 480px) {
  .hero {
    height: 350px;
  }

  .hero__content {
    left: 16px;
    top: 100px;
  }

  .hero__title {
    font-size: 24px;
    line-height: 1.1;
  }

  .hero__cta {
    top: 260px;
  }
}
</style>
