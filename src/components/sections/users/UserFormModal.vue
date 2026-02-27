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

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.user-form__row {
  display: flex;
  gap: var(--spacing-md);
}

.user-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.user-form__label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.user-form__input {
  padding: 10px 14px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  color: var(--color-text);
}

.user-form__input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.user-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.user-form__btn {
  padding: 8px 24px;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
}

.user-form__btn--cancel {
  background: none;
  border: 1px solid var(--color-primary);
  color: var(--color-text);
}

.user-form__btn--save {
  background: var(--color-primary);
  border: none;
  color: var(--color-white);
}

.user-form__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .user-form__row {
    flex-direction: column;
  }
}
</style>
