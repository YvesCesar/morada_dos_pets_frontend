<script setup lang="ts">
import bannerLogin from '@/assets/images/banner-login-6366af.png'
</script>

<template>
  <section class="login-banner">
    <div class="login-banner__background">
      <img :src="bannerLogin" alt="Pets na Morada dos Pets" class="login-banner__image" />
      <div class="login-banner__overlay"></div>
    </div>

    <div class="login-banner__content">
      <h1 class="login-banner__title">Que bom ter você de volta!</h1>
    </div>
  </section>
</template>

<style scoped>
.login-banner {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.login-banner__background {
  position: absolute;
  inset: 0;
}

.login-banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.login-banner__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(91, 91, 91, 0.96) 0%,
    rgba(86, 86, 86, 1) 4%,
    rgba(10, 9, 9, 0.67) 41%,
    rgba(113, 110, 110, 0.72) 75%,
    rgba(217, 217, 217, 0) 100%
  );
}

.login-banner__content {
  position: absolute;
  top: 214px;
  left: var(--container-padding);
  z-index: 1;
}

.login-banner__title {
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  color: var(--color-white);
  line-height: 1.25;
  max-width: 365px;
}

@media (max-width: 1200px) {
  .login-banner__content {
    top: 150px;
  }

  .login-banner__title {
    font-size: var(--text-3xl);
    max-width: 300px;
  }
}

@media (max-width: 992px) {
  .login-banner {
    position: relative;
    min-height: 300px;
  }

  .login-banner__content {
    top: 50%;
    transform: translateY(-50%);
  }

  .login-banner__title {
    font-size: var(--text-2xl);
    max-width: 250px;
  }
}

@media (max-width: 768px) {
  .login-banner {
    min-height: 250px;
  }

  .login-banner__title {
    font-size: var(--text-xl);
    max-width: 200px;
  }
}
</style>
