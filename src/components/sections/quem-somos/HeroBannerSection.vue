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
