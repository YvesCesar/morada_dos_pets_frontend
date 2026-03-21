<script setup lang="ts">
import type { DogSpaService, HospedagemPlan, CrechePlan } from '@/types'
import { usePricesEditor } from '@/composables'

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

const {
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
} = usePricesEditor(props, (event, data) => {
  if (event === 'saveDogSpa') emit('saveDogSpa', data as DogSpaService[])
  else if (event === 'saveHospedagem') emit('saveHospedagem', data as HospedagemPlan[])
  else if (event === 'saveCreche') emit('saveCreche', data as CrechePlan[])
})
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
        <table class="prices-editor__table" aria-label="Tabela de preços">
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
        <span v-if="savedTab === 'dog-spa'" class="prices-editor__saved-msg" role="status">
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
        <table class="prices-editor__table" aria-label="Tabela de preços">
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
        <span v-if="savedTab === 'hospedagem'" class="prices-editor__saved-msg" role="status">
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
        <table class="prices-editor__table" aria-label="Tabela de preços">
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
        <span v-if="savedTab === 'creche'" class="prices-editor__saved-msg" role="status">
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
