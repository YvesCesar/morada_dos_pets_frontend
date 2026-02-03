<script setup lang="ts">
import HeroBannerDogSpa from '@/components/sections/dog-spa/HeroBannerDogSpa.vue'
import DescriptionSection from '@/components/sections/dog-spa/DescriptionSection.vue'
import DogSpaServicesSection from '@/components/sections/dog-spa/DogSpaServicesSection.vue'
import BenefitsSection from '@/components/sections/dog-spa/BenefitsSection.vue'
</script>

<template>
  <main class="dog-spa">
    <HeroBannerDogSpa />
    <DescriptionSection />
    <DogSpaServicesSection />
    <BenefitsSection />
  </main>
</template>

<style scoped>
.dog-spa {
  min-height: 100vh;
}
</style>
