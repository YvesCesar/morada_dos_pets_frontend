<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UserProfile } from '@/types'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = defineProps<{
  user?: UserProfile
}>()

const emit = defineEmits<{
  close: []
  save: [data: Omit<UserProfile, 'id' | 'createdAt'>]
}>()

const isEdit = !!props.user

const name = ref(props.user?.name ?? '')
const email = ref(props.user?.email ?? '')
const role = ref(props.user?.role ?? 'customer')
const phone = ref(props.user?.phone ?? '')
const cpf = ref(props.user?.cpf ?? '')
const active = ref(props.user?.active ?? true)

const isValid = computed(() => name.value.trim() !== '' && email.value.trim() !== '')

const handleSave = () => {
  if (!isValid.value) return
  emit('save', {
    name: name.value,
    email: email.value,
    role: role.value as 'admin' | 'customer',
    phone: phone.value,
    cpf: cpf.value,
    birthDate: props.user?.birthDate ?? '',
    cep: props.user?.cep ?? '',
    address: props.user?.address ?? '',
    addressNumber: props.user?.addressNumber ?? '',
    neighborhood: props.user?.neighborhood ?? '',
    photo: props.user?.photo ?? '',
    active: active.value,
  })
}
</script>

<template>
  <BaseModal :title="isEdit ? 'Editar Usuário' : 'Novo Usuário'" @close="emit('close')">
    <form class="user-form" @submit.prevent="handleSave">
      <div class="user-form__field">
        <label class="user-form__label">Nome</label>
        <input v-model="name" type="text" class="user-form__input" />
      </div>

      <div class="user-form__field">
        <label class="user-form__label">E-mail</label>
        <input v-model="email" type="email" class="user-form__input" />
      </div>

      <div class="user-form__row">
        <div class="user-form__field">
          <label class="user-form__label">Papel</label>
          <select v-model="role" class="user-form__input">
            <option value="customer">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="user-form__field">
          <label class="user-form__label">Telefone</label>
          <input v-model="phone" type="text" class="user-form__input" />
        </div>
      </div>

      <div class="user-form__field">
        <label class="user-form__label">CPF</label>
        <input v-model="cpf" type="text" class="user-form__input" />
      </div>

      <div class="user-form__actions">
        <button type="button" class="user-form__btn user-form__btn--cancel" @click="emit('close')">Cancelar</button>
        <button type="submit" class="user-form__btn user-form__btn--save" :disabled="!isValid">Salvar</button>
      </div>
    </form>
  </BaseModal>
</template>
