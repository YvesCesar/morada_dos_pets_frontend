<script setup lang="ts">
import HeroBannerSection from '@/components/sections/quem-somos/HeroBannerSection.vue'
import HistorySection from '@/components/sections/quem-somos/HistorySection.vue'
import MissionVisionValuesSection from '@/components/sections/quem-somos/MissionVisionValuesSection.vue'
import UnitsSection from '@/components/sections/quem-somos/UnitsSection.vue'
import TestimonialsSection from '@/components/sections/quem-somos/TestimonialsSection.vue'
</script>

<template>
  <main class="quem-somos">
    <HeroBannerSection title="Quem somos?" subtitle="Como tudo começou..." />
    <HistorySection />
    <MissionVisionValuesSection />
    <UnitsSection />
    <TestimonialsSection />
  </main>
</template>

<style scoped>
.quem-somos {
  min-height: 100vh;
}
</style>
