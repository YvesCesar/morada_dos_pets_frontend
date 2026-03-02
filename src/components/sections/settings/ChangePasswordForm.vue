<script setup lang="ts">
import { ref, computed } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const success = ref(false)

const isNewPasswordValid = computed(() => newPassword.value.length >= 6)
const isPasswordMatch = computed(() => newPassword.value === confirmPassword.value && confirmPassword.value !== '')
const isValid = computed(() => currentPassword.value !== '' && isNewPasswordValid.value && isPasswordMatch.value)

const handleSubmit = () => {
  if (!isValid.value) return
  success.value = true
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  setTimeout(() => {
    success.value = false
  }, 3000)
}
</script>

<template>
  <div class="password-form">
    <p v-if="success" class="password-form__success">Senha alterada com sucesso!</p>

    <form class="password-form__form" @submit.prevent="handleSubmit">
      <div class="password-form__field">
        <label class="password-form__label">Senha atual</label>
        <input v-model="currentPassword" type="password" class="password-form__input" />
      </div>

      <div class="password-form__field">
        <label class="password-form__label">Nova senha (6 ou mais caracteres)</label>
        <input
          v-model="newPassword"
          type="password"
          class="password-form__input"
          :class="{ 'password-form__input--error': newPassword && !isNewPasswordValid }"
        />
      </div>

      <div class="password-form__field">
        <label class="password-form__label">Confirmar nova senha</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="password-form__input"
          :class="{ 'password-form__input--error': confirmPassword && !isPasswordMatch }"
        />
      </div>

      <div class="password-form__actions">
        <button type="submit" class="password-form__btn" :disabled="!isValid">Alterar senha</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.password-form {
  background: var(--color-white);
  border-radius: 14px;
  padding: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 460px;
}

.password-form__success {
  color: var(--color-success);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  margin-bottom: var(--spacing-md);
  padding: 10px 14px;
  background: var(--color-success-light);
  border-radius: var(--radius-sm);
}

.password-form__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.password-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.password-form__label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.password-form__input {
  padding: 10px 14px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-input);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  color: var(--color-text);
}

.password-form__input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.password-form__input--error {
  border-color: #e74c3c;
}

.password-form__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-sm);
}

.password-form__btn {
  padding: 8px 24px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.password-form__btn:hover {
  opacity: 0.9;
}

.password-form__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
