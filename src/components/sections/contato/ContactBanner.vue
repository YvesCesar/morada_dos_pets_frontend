<script setup lang="ts">
import bannerContato from '@/assets/images/banner-contato.png'
</script>

<template>
  <section class="hero-banner">
    <div class="hero-banner__background">
      <img :src="bannerContato" alt="Banner Contato" class="hero-banner__image" />
      <div class="hero-banner__overlay"></div>
    </div>

    <div class="hero-banner__content">
      <h1 class="hero-banner__title">Contato</h1>
      <p class="hero-banner__subtitle">Como podemos te ajudar?</p>
    </div>
  </section>
</template>
