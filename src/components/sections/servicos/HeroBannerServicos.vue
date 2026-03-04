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
