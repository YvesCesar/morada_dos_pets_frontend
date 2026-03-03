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
