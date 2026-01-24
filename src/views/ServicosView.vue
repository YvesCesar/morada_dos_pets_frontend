<script setup lang="ts">
import HeroBannerServicos from '@/components/sections/servicos/HeroBannerServicos.vue'
import DedicationSection from '@/components/sections/servicos/DedicationSection.vue'
import ServicesCards from '@/components/shared/ServicesCards.vue'
import TutorialSection from '@/components/sections/servicos/TutorialSection.vue'
import ClientsCarouselSection from '@/components/sections/servicos/ClientsCarouselSection.vue'
</script>

<template>
  <main class="servicos">
    <HeroBannerServicos />
    <DedicationSection />
    <ServicesCards />
    <TutorialSection />
    <ClientsCarouselSection />
  </main>
</template>

<style scoped>
.servicos {
  min-height: 100vh;
}
</style>
