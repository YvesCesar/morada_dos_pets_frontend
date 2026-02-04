<script setup lang="ts">
import { hospedagemBenefits } from '@/data'
import BenefitsSection from '@/components/shared/BenefitsSection.vue'
</script>

<template>
  <BenefitsSection :benefits="hospedagemBenefits" />
</template>
