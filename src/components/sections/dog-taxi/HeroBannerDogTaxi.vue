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
