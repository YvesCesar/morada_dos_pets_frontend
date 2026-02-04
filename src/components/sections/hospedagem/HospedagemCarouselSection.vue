<script setup lang="ts">
import { hospedagemCarouselImages } from '@/data'
import ImagesCarousel from '@/components/shared/ImagesCarousel.vue'
</script>

<template>
  <ImagesCarousel :images="hospedagemCarouselImages" title="" />
</template>
