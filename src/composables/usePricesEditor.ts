import { ref, computed, watch, toRaw } from 'vue'
import type { DogSpaService, HospedagemPlan, CrechePlan } from '@/types'

interface PricesEditorProps {
  dogSpaServices: DogSpaService[]
  hospedagemPlans: HospedagemPlan[]
  crechePlans: CrechePlan[]
}

/**
 * Composable para edição de preços com change detection
 */
export function usePricesEditor(
  props: PricesEditorProps,
  emit: (event: 'saveDogSpa' | 'saveHospedagem' | 'saveCreche', data: unknown) => void,
) {
  const activeTab = ref('dog-spa')

  const tabs = [
    { id: 'dog-spa', label: 'Dog Spa' },
    { id: 'hospedagem', label: 'Hospedagem' },
    { id: 'creche', label: 'Creche' },
  ]

  const draftDogSpa = ref<DogSpaService[]>(structuredClone(toRaw(props.dogSpaServices)))
  const draftHospedagem = ref<HospedagemPlan[]>(structuredClone(toRaw(props.hospedagemPlans)))
  const draftCreche = ref<CrechePlan[]>(structuredClone(toRaw(props.crechePlans)))

  watch(
    () => props.dogSpaServices,
    (val) => { draftDogSpa.value = structuredClone(toRaw(val)) },
  )
  watch(
    () => props.hospedagemPlans,
    (val) => { draftHospedagem.value = structuredClone(toRaw(val)) },
  )
  watch(
    () => props.crechePlans,
    (val) => { draftCreche.value = structuredClone(toRaw(val)) },
  )

  const hasDogSpaChanges = computed(
    () => JSON.stringify(draftDogSpa.value) !== JSON.stringify(props.dogSpaServices),
  )
  const hasHospedagemChanges = computed(
    () => JSON.stringify(draftHospedagem.value) !== JSON.stringify(props.hospedagemPlans),
  )
  const hasCrecheChanges = computed(
    () => JSON.stringify(draftCreche.value) !== JSON.stringify(props.crechePlans),
  )

  const savedTab = ref<string | null>(null)

  const showSaved = (tabId: string) => {
    savedTab.value = tabId
    setTimeout(() => { savedTab.value = null }, 2500)
  }

  const saveDogSpa = () => {
    emit('saveDogSpa', structuredClone(toRaw(draftDogSpa.value)))
    showSaved('dog-spa')
  }

  const saveHospedagem = () => {
    emit('saveHospedagem', structuredClone(toRaw(draftHospedagem.value)))
    showSaved('hospedagem')
  }

  const saveCreche = () => {
    emit('saveCreche', structuredClone(toRaw(draftCreche.value)))
    showSaved('creche')
  }

  return {
    activeTab,
    tabs,
    draftDogSpa,
    draftHospedagem,
    draftCreche,
    hasDogSpaChanges,
    hasHospedagemChanges,
    hasCrecheChanges,
    savedTab,
    saveDogSpa,
    saveHospedagem,
    saveCreche,
  }
}
