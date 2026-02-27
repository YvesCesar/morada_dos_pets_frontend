<script setup lang="ts">
import type { DogSpaService, HospedagemPlan, CrechePlan } from '@/types'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import PricesEditor from '@/components/sections/prices/PricesEditor.vue'
import { usePricesStore } from '@/stores/prices'

const pricesStore = usePricesStore()

if (pricesStore.dogSpaServices.length === 0) {
  pricesStore.loadPrices()
}
</script>

<template>
  <DashboardLayout title="Preços" subtitle="Gerencie os preços dos serviços">
    <PricesEditor
      :dog-spa-services="pricesStore.dogSpaServices"
      :hospedagem-plans="pricesStore.hospedagemPlans"
      :creche-plans="pricesStore.crechePlans"
      @save-dog-spa="(s: DogSpaService[]) => pricesStore.setDogSpaServices(s)"
      @save-hospedagem="(p: HospedagemPlan[]) => pricesStore.setHospedagemPlans(p)"
      @save-creche="(p: CrechePlan[]) => pricesStore.setCrechePlans(p)"
    />
  </DashboardLayout>
</template>
