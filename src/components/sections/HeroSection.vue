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
