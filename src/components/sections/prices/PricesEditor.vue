<script setup lang="ts">
import { ref, computed, watch, toRaw } from 'vue'
import type { DogSpaService, HospedagemPlan, CrechePlan } from '@/types'

const props = defineProps<{
  dogSpaServices: DogSpaService[]
  hospedagemPlans: HospedagemPlan[]
  crechePlans: CrechePlan[]
}>()

const emit = defineEmits<{
  saveDogSpa: [services: DogSpaService[]]
  saveHospedagem: [plans: HospedagemPlan[]]
  saveCreche: [plans: CrechePlan[]]
}>()

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
</script>

<template>
  <div class="prices-editor">
    <div class="prices-editor__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="prices-editor__tab"
        :class="{ 'prices-editor__tab--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Dog Spa -->
    <div v-if="activeTab === 'dog-spa'" class="prices-editor__content">
      <div v-for="(service, si) in draftDogSpa" :key="service.id" class="prices-editor__section">
        <h3 class="prices-editor__section-title">{{ service.title }}</h3>
        <table class="prices-editor__table">
          <thead>
            <tr>
              <th>Porte</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, idx) in service.prices" :key="idx">
              <td>{{ price.size }}</td>
              <td>
                <input
                  v-model="draftDogSpa[si]!.prices[idx]!.price"
                  type="text"
                  class="prices-editor__input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="hasDogSpaChanges || savedTab === 'dog-spa'" class="prices-editor__actions">
        <span v-if="savedTab === 'dog-spa'" class="prices-editor__saved-msg">
          Preços salvos com sucesso!
        </span>
        <button
          class="prices-editor__btn prices-editor__btn--save"
          :disabled="!hasDogSpaChanges"
          @click="saveDogSpa"
        >
          Salvar
        </button>
      </div>
    </div>

    <!-- Hospedagem -->
    <div v-if="activeTab === 'hospedagem'" class="prices-editor__content">
      <div v-for="(plan, pi) in draftHospedagem" :key="plan.id" class="prices-editor__section">
        <h3 class="prices-editor__section-title">{{ plan.title }}</h3>
        <table class="prices-editor__table">
          <thead>
            <tr>
              <th>Porte</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, idx) in plan.prices" :key="idx">
              <td>{{ price.size }}</td>
              <td>
                <input
                  v-model="draftHospedagem[pi]!.prices[idx]!.price"
                  type="text"
                  class="prices-editor__input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="hasHospedagemChanges || savedTab === 'hospedagem'" class="prices-editor__actions">
        <span v-if="savedTab === 'hospedagem'" class="prices-editor__saved-msg">
          Preços salvos com sucesso!
        </span>
        <button
          class="prices-editor__btn prices-editor__btn--save"
          :disabled="!hasHospedagemChanges"
          @click="saveHospedagem"
        >
          Salvar
        </button>
      </div>
    </div>

    <!-- Creche -->
    <div v-if="activeTab === 'creche'" class="prices-editor__content">
      <div v-for="(plan, pi) in draftCreche" :key="plan.id" class="prices-editor__section">
        <h3 class="prices-editor__section-title">{{ plan.title }}</h3>
        <p class="prices-editor__schedule">{{ plan.schedule }}</p>
        <table class="prices-editor__table">
          <thead>
            <tr>
              <th>Frequência</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, idx) in plan.prices" :key="idx">
              <td>{{ price.frequency }}</td>
              <td>
                <input
                  v-model="draftCreche[pi]!.prices[idx]!.price"
                  type="text"
                  class="prices-editor__input"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="hasCrecheChanges || savedTab === 'creche'" class="prices-editor__actions">
        <span v-if="savedTab === 'creche'" class="prices-editor__saved-msg">
          Preços salvos com sucesso!
        </span>
        <button
          class="prices-editor__btn prices-editor__btn--save"
          :disabled="!hasCrecheChanges"
          @click="saveCreche"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prices-editor {
  background: var(--color-white);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.prices-editor__tabs {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.prices-editor__tab {
  padding: 14px 24px;
  border: none;
  background: none;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-muted);
  cursor: pointer;
  position: relative;
  transition: color var(--transition-fast);
}

.prices-editor__tab--active {
  color: var(--color-text);
  font-weight: var(--font-semibold);
}

.prices-editor__tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
}

.prices-editor__content {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.prices-editor__section-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: 8px;
}

.prices-editor__schedule {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.prices-editor__table {
  width: 100%;
  border-collapse: collapse;
}

.prices-editor__table th {
  text-align: left;
  padding: 10px 12px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-muted);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.prices-editor__table td {
  padding: 8px 12px;
  font-size: var(--text-xs);
  color: var(--color-text);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.prices-editor__input {
  padding: 6px 10px;
  border: 1px solid var(--color-input-border);
  border-radius: var(--radius-input);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  color: var(--color-text);
  width: 140px;
}

.prices-editor__input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.prices-editor__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin-top: var(--spacing-sm);
}

.prices-editor__saved-msg {
  font-size: var(--text-xs);
  color: var(--color-success);
  margin-right: auto;
}

.prices-editor__btn {
  padding: 8px 24px;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
  border: none;
}

.prices-editor__btn--save {
  background: var(--color-primary);
  color: var(--color-white);
}

.prices-editor__btn--save:hover {
  opacity: 0.9;
}


@media (max-width: 480px) {
  .prices-editor__tab {
    padding: 12px 16px;
    font-size: var(--text-xs);
  }

  .prices-editor__input {
    width: 100px;
  }

  .prices-editor__actions {
    flex-wrap: wrap;
  }

  .prices-editor__btn {
    flex: 1;
    text-align: center;
  }
}
</style>
