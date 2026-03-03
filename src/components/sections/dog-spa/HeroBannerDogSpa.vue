<script setup lang="ts">
import bannerDogSpa from '@/assets/images/dog-spa/dog-spa-banner.png'
</script>

<template>
  <section class="hero-banner-dog-spa">
    <div class="hero-banner-dog-spa__background">
      <img :src="bannerDogSpa" alt="" class="hero-banner-dog-spa__image" />
      <div class="hero-banner-dog-spa__overlay"></div>
    </div>

    <div class="hero-banner-dog-spa__content">
      <h1 class="hero-banner-dog-spa__title">Dog Spa</h1>
      <p class="hero-banner-dog-spa__subtitle">Um ambiente tranquilo e aconchegante</p>
    </div>
  </section>
</template>
