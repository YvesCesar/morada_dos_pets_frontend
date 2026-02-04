<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroBannerHospedagem from '@/components/sections/hospedagem/HeroBannerHospedagem.vue'
import ServiceTabs from '@/components/shared/ServiceTabs.vue'
import DescriptionSection from '@/components/sections/hospedagem/DescriptionSection.vue'
import PricingNoteSection from '@/components/sections/hospedagem/PricingNoteSection.vue'
import HospedagemPricingSection from '@/components/sections/hospedagem/HospedagemPricingSection.vue'
import CrechePricingSection from '@/components/sections/hospedagem/CrechePricingSection.vue'
import HospedagemCarouselSection from '@/components/sections/hospedagem/HospedagemCarouselSection.vue'
import BenefitsSection from '@/components/sections/hospedagem/BenefitsSection.vue'

const activeTab = ref<'hospedagem' | 'creche'>('hospedagem')

const tabs = computed(() => [
  { label: 'Hospedagem', id: 'hospedagem', active: activeTab.value === 'hospedagem' },
  { label: 'Creche', id: 'creche', active: activeTab.value === 'creche' },
])

const handleTabClick = (tabId: string) => {
  activeTab.value = tabId as 'hospedagem' | 'creche'
}

const isHospedagem = computed(() => activeTab.value === 'hospedagem')
</script>

<template>
  <main class="hospedagem">
    <HeroBannerHospedagem />
    <DescriptionSection />
    <ServiceTabs :tabs="tabs" @tab-click="handleTabClick" />
    <PricingNoteSection v-if="isHospedagem" />
    <HospedagemPricingSection v-if="isHospedagem" />
    <CrechePricingSection v-else />
    <HospedagemCarouselSection v-if="isHospedagem" />
    <BenefitsSection />
  </main>
</template>

<style scoped>
.hospedagem {
  min-height: 100vh;
}
</style>
