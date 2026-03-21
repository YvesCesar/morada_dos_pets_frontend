<script setup lang="ts">
import type { UserProfile } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { vMaska } from 'maska/vue'
import { MASKS } from '@/config/masks'
import { userFormSchema } from '@/schemas'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = defineProps<{
  user?: UserProfile
}>()

const emit = defineEmits<{
  close: []
  save: [data: Omit<UserProfile, 'id' | 'createdAt'>]
}>()

const isEdit = !!props.user

const { handleSubmit, errors, defineField, meta } = useForm({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues: {
    name: props.user?.name ?? '',
    email: props.user?.email ?? '',
    role: props.user?.role ?? 'customer',
    phone: props.user?.phone ?? '',
    cpf: props.user?.cpf ?? '',
    active: props.user?.active ?? true,
  },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [role, roleAttrs] = defineField('role')
const [phone, phoneAttrs] = defineField('phone')
const [cpf, cpfAttrs] = defineField('cpf')
const [active, activeAttrs] = defineField('active')

const onSubmit = handleSubmit((values) => {
  emit('save', {
    name: values.name,
    email: values.email,
    role: values.role,
    phone: values.phone,
    cpf: values.cpf,
    birthDate: props.user?.birthDate ?? '',
    cep: props.user?.cep ?? '',
    address: props.user?.address ?? '',
    addressNumber: props.user?.addressNumber ?? '',
    neighborhood: props.user?.neighborhood ?? '',
    photo: props.user?.photo ?? '',
    active: values.active,
  })
})
</script>

<template>
  <BaseModal :title="isEdit ? 'Editar Usuário' : 'Novo Usuário'" @close="emit('close')">
    <form class="user-form" @submit.prevent="onSubmit">
      <div class="user-form__field">
        <label class="user-form__label">Nome</label>
        <input
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          class="user-form__input"
          :class="{ 'user-form__input--error': errors.name }"
        />
        <span v-if="errors.name" class="form-error-message">{{ errors.name }}</span>
      </div>

      <div class="user-form__field">
        <label class="user-form__label">E-mail</label>
        <input
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          class="user-form__input"
          :class="{ 'user-form__input--error': errors.email }"
        />
        <span v-if="errors.email" class="form-error-message">{{ errors.email }}</span>
      </div>

      <div class="user-form__row">
        <div class="user-form__field">
          <label class="user-form__label">Papel</label>
          <select
            v-model="role"
            v-bind="roleAttrs"
            class="user-form__input"
          >
            <option value="customer">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="user-form__field">
          <label class="user-form__label">Telefone</label>
          <input
            v-model="phone"
            v-bind="phoneAttrs"
            v-maska="MASKS.phone"
            type="text"
            class="user-form__input"
            :class="{ 'user-form__input--error': errors.phone }"
          />
          <span v-if="errors.phone" class="form-error-message">{{ errors.phone }}</span>
        </div>
      </div>

      <div class="user-form__field">
        <label class="user-form__label">CPF</label>
        <input
          v-model="cpf"
          v-bind="cpfAttrs"
          v-maska="MASKS.cpf"
          type="text"
          class="user-form__input"
          :class="{ 'user-form__input--error': errors.cpf }"
        />
        <span v-if="errors.cpf" class="form-error-message">{{ errors.cpf }}</span>
      </div>

      <div class="user-form__field user-form__field--checkbox">
        <input
          id="user-active"
          v-model="active"
          v-bind="activeAttrs"
          type="checkbox"
        />
        <label for="user-active" class="user-form__label">Ativo</label>
      </div>

      <div class="user-form__actions">
        <button type="button" class="user-form__btn user-form__btn--cancel" @click="emit('close')">Cancelar</button>
        <button type="submit" class="user-form__btn user-form__btn--save" :disabled="!meta.valid">Salvar</button>
      </div>
    </form>
  </BaseModal>
</template>
