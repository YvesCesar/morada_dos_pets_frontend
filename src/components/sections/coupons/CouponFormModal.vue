<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Coupon } from '@/types'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = defineProps<{
  coupon?: Coupon
}>()

const emit = defineEmits<{
  close: []
  save: [data: Omit<Coupon, 'id' | 'currentUses'>]
}>()

const isEdit = !!props.coupon

const code = ref(props.coupon?.code ?? '')
const type = ref<'percentage' | 'fixed'>(props.coupon?.type ?? 'percentage')
const value = ref(props.coupon?.value ?? 0)
const maxUses = ref(props.coupon?.maxUses ?? 100)
const expiresAt = ref(props.coupon?.expiresAt ?? '')
const active = ref(props.coupon?.active ?? true)

const isValid = computed(() => code.value.trim() !== '' && value.value > 0 && expiresAt.value !== '')

const handleSave = () => {
  if (!isValid.value) return
  emit('save', {
    code: code.value.toUpperCase(),
    type: type.value,
    value: value.value,
    maxUses: maxUses.value,
    expiresAt: expiresAt.value,
    active: active.value,
  })
}
</script>

<template>
  <BaseModal :title="isEdit ? 'Editar Cupom' : 'Novo Cupom'" @close="emit('close')">
    <form class="coupon-form" @submit.prevent="handleSave">
      <div class="coupon-form__field">
        <label class="coupon-form__label">Código</label>
        <input v-model="code" type="text" class="coupon-form__input" placeholder="MORADA10" />
      </div>

      <div class="coupon-form__row">
        <div class="coupon-form__field">
          <label class="coupon-form__label">Tipo de desconto</label>
          <select v-model="type" class="coupon-form__input">
            <option value="percentage">Percentual (%)</option>
            <option value="fixed">Valor fixo (R$)</option>
          </select>
        </div>

        <div class="coupon-form__field">
          <label class="coupon-form__label">Valor</label>
          <input v-model.number="value" type="number" min="0" step="0.01" class="coupon-form__input" />
        </div>
      </div>

      <div class="coupon-form__row">
        <div class="coupon-form__field">
          <label class="coupon-form__label">Limite de uso</label>
          <input v-model.number="maxUses" type="number" min="1" class="coupon-form__input" />
        </div>

        <div class="coupon-form__field">
          <label class="coupon-form__label">Validade</label>
          <input v-model="expiresAt" type="date" class="coupon-form__input" />
        </div>
      </div>

      <div class="coupon-form__field coupon-form__field--checkbox">
        <input id="coupon-active" v-model="active" type="checkbox" />
        <label for="coupon-active" class="coupon-form__label">Ativo</label>
      </div>

      <div class="coupon-form__actions">
        <button type="button" class="coupon-form__btn coupon-form__btn--cancel" @click="emit('close')">Cancelar</button>
        <button type="submit" class="coupon-form__btn coupon-form__btn--save" :disabled="!isValid">Salvar</button>
      </div>
    </form>
  </BaseModal>
</template>
