/**
 * Store de preços — lê dos data files e permite edição admin (reativo)
 */
import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import type { DogSpaService, HospedagemPlan, CrechePlan } from '@/types'
import { dogSpaServices as defaultDogSpa } from '@/data/dogSpa'
import { hospedagemPlans as defaultHospedagem, crechePlans as defaultCreche } from '@/data/hospedagem'

export const usePricesStore = defineStore('prices', () => {
  const dogSpaServices = ref<DogSpaService[]>([])
  const hospedagemPlans = ref<HospedagemPlan[]>([])
  const crechePlans = ref<CrechePlan[]>([])

  function loadPrices() {
    if (dogSpaServices.value.length > 0) return
    dogSpaServices.value = structuredClone(defaultDogSpa)
    hospedagemPlans.value = structuredClone(defaultHospedagem)
    crechePlans.value = structuredClone(defaultCreche)
  }

  function updateDogSpaPrice(serviceId: string, sizeIndex: number, newPrice: string) {
    const service = dogSpaServices.value.find((s) => s.id === serviceId)
    if (service && service.prices[sizeIndex]) {
      service.prices[sizeIndex].price = newPrice
    }
  }

  function updateHospedagemPrice(planId: string, sizeIndex: number, newPrice: string) {
    const plan = hospedagemPlans.value.find((p) => p.id === planId)
    if (plan && plan.prices[sizeIndex]) {
      plan.prices[sizeIndex].price = newPrice
    }
  }

  function updateCrechePrice(planId: string, freqIndex: number, newPrice: string) {
    const plan = crechePlans.value.find((p) => p.id === planId)
    if (plan && plan.prices[freqIndex]) {
      plan.prices[freqIndex].price = newPrice
    }
  }

  function setDogSpaServices(services: DogSpaService[]) {
    dogSpaServices.value = structuredClone(toRaw(services))
  }

  function setHospedagemPlans(plans: HospedagemPlan[]) {
    hospedagemPlans.value = structuredClone(toRaw(plans))
  }

  function setCrechePlans(plans: CrechePlan[]) {
    crechePlans.value = structuredClone(toRaw(plans))
  }

  return {
    dogSpaServices,
    hospedagemPlans,
    crechePlans,
    loadPrices,
    updateDogSpaPrice,
    updateHospedagemPrice,
    updateCrechePrice,
    setDogSpaServices,
    setHospedagemPlans,
    setCrechePlans,
  }
})
