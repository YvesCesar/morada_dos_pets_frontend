<script setup lang="ts">
import bannerHospedagem from '@/assets/images/hospedagem/hospedagem-banner.png'
</script>

<template>
  <section class="hero-banner-hospedagem">
    <div class="hero-banner-hospedagem__background">
      <img :src="bannerHospedagem" alt="" class="hero-banner-hospedagem__image" />
      <div class="hero-banner-hospedagem__overlay"></div>
    </div>

    <div class="hero-banner-hospedagem__content">
      <h1 class="hero-banner-hospedagem__title">Hospedagem</h1>
      <p class="hero-banner-hospedagem__subtitle">Um ambiente tranquilo e aconchegante</p>
    </div>
  </section>
</template>
