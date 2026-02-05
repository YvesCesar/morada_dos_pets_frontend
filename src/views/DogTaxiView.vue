<script setup lang="ts">
import HeroBannerDogTaxi from '@/components/sections/dog-taxi/HeroBannerDogTaxi.vue'
import DescriptionSection from '@/components/sections/dog-taxi/DescriptionSection.vue'
import BenefitsSection from '@/components/sections/dog-taxi/BenefitsSection.vue'
</script>

<template>
  <main class="dog-taxi">
    <HeroBannerDogTaxi />
    <DescriptionSection />
    <BenefitsSection />
  </main>
</template>

<style scoped>
.dog-taxi {
  min-height: 100vh;
}
</style>
