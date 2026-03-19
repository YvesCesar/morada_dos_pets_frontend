<script setup lang="ts">
import type { Coupon } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { couponFormSchema } from '@/schemas'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = defineProps<{
  coupon?: Coupon
}>()

const emit = defineEmits<{
  close: []
  save: [data: Omit<Coupon, 'id' | 'currentUses'>]
}>()

const isEdit = !!props.coupon

const { handleSubmit, errors, defineField, meta } = useForm({
  validationSchema: toTypedSchema(couponFormSchema),
  initialValues: {
    code: props.coupon?.code ?? '',
    type: props.coupon?.type ?? 'percentage',
    value: props.coupon?.value ?? 0,
    maxUses: props.coupon?.maxUses ?? 100,
    expiresAt: props.coupon?.expiresAt ?? '',
    active: props.coupon?.active ?? true,
  },
})

const [code, codeAttrs] = defineField('code')
const [type, typeAttrs] = defineField('type')
const [value, valueAttrs] = defineField('value')
const [maxUses, maxUsesAttrs] = defineField('maxUses')
const [expiresAt, expiresAtAttrs] = defineField('expiresAt')
const [active, activeAttrs] = defineField('active')

const onSubmit = handleSubmit((values) => {
  emit('save', {
    code: values.code.toUpperCase(),
    type: values.type,
    value: values.value,
    maxUses: values.maxUses,
    expiresAt: values.expiresAt,
    active: values.active,
  })
})
</script>

<template>
  <BaseModal :title="isEdit ? 'Editar Cupom' : 'Novo Cupom'" @close="emit('close')">
    <form class="coupon-form" @submit.prevent="onSubmit">
      <div class="coupon-form__field">
        <label class="coupon-form__label">Código</label>
        <input
          v-model="code"
          v-bind="codeAttrs"
          type="text"
          class="coupon-form__input"
          :class="{ 'coupon-form__input--error': errors.code }"
          placeholder="MORADA10"
        />
        <span v-if="errors.code" class="form-error-message">{{ errors.code }}</span>
      </div>

      <div class="coupon-form__row">
        <div class="coupon-form__field">
          <label class="coupon-form__label">Tipo de desconto</label>
          <select
            v-model="type"
            v-bind="typeAttrs"
            class="coupon-form__input"
          >
            <option value="percentage">Percentual (%)</option>
            <option value="fixed">Valor fixo (R$)</option>
          </select>
        </div>

        <div class="coupon-form__field">
          <label class="coupon-form__label">Valor</label>
          <input
            v-model.number="value"
            v-bind="valueAttrs"
            type="number"
            min="0"
            step="0.01"
            class="coupon-form__input"
            :class="{ 'coupon-form__input--error': errors.value }"
          />
          <span v-if="errors.value" class="form-error-message">{{ errors.value }}</span>
        </div>
      </div>

      <div class="coupon-form__row">
        <div class="coupon-form__field">
          <label class="coupon-form__label">Limite de uso</label>
          <input
            v-model.number="maxUses"
            v-bind="maxUsesAttrs"
            type="number"
            min="1"
            class="coupon-form__input"
            :class="{ 'coupon-form__input--error': errors.maxUses }"
          />
          <span v-if="errors.maxUses" class="form-error-message">{{ errors.maxUses }}</span>
        </div>

        <div class="coupon-form__field">
          <label class="coupon-form__label">Validade</label>
          <input
            v-model="expiresAt"
            v-bind="expiresAtAttrs"
            type="date"
            class="coupon-form__input"
            :class="{ 'coupon-form__input--error': errors.expiresAt }"
          />
          <span v-if="errors.expiresAt" class="form-error-message">{{ errors.expiresAt }}</span>
        </div>
      </div>

      <div class="coupon-form__field coupon-form__field--checkbox">
        <input
          id="coupon-active"
          v-model="active"
          v-bind="activeAttrs"
          type="checkbox"
        />
        <label for="coupon-active" class="coupon-form__label">Ativo</label>
      </div>

      <div class="coupon-form__actions">
        <button type="button" class="coupon-form__btn coupon-form__btn--cancel" @click="emit('close')">Cancelar</button>
        <button type="submit" class="coupon-form__btn coupon-form__btn--save" :disabled="!meta.valid">Salvar</button>
      </div>
    </form>
  </BaseModal>
</template>
