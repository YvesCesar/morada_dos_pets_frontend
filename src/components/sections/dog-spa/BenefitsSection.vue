<script setup lang="ts">
import { dogSpaBenefits } from '@/data'
import BenefitsSection from '@/components/shared/BenefitsSection.vue'
</script>

<template>
  <BenefitsSection :benefits="dogSpaBenefits" />
</template>
