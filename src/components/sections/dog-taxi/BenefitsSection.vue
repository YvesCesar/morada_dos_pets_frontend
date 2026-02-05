<script setup lang="ts">
import { dogTaxiBenefits } from '@/data'
import BenefitsSection from '@/components/shared/BenefitsSection.vue'
</script>

<template>
  <BenefitsSection :benefits="dogTaxiBenefits" />
</template>
