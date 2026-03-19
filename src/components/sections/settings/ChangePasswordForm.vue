<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { changePasswordSchema } from '@/schemas'

const success = ref(false)

const { handleSubmit, errors, defineField, resetForm, meta } = useForm({
  validationSchema: toTypedSchema(changePasswordSchema),
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
})

const [currentPassword, currentPasswordAttrs] = defineField('currentPassword')
const [newPassword, newPasswordAttrs] = defineField('newPassword')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit(() => {
  success.value = true
  resetForm()
  setTimeout(() => {
    success.value = false
  }, 3000)
})
</script>

<template>
  <div class="password-form">
    <p v-if="success" class="password-form__success">Senha alterada com sucesso!</p>

    <form class="password-form__form" @submit.prevent="onSubmit">
      <div class="password-form__field">
        <label class="password-form__label">Senha atual</label>
        <input
          v-model="currentPassword"
          v-bind="currentPasswordAttrs"
          type="password"
          class="password-form__input"
          :class="{ 'password-form__input--error': errors.currentPassword }"
        />
        <span v-if="errors.currentPassword" class="form-error-message">{{ errors.currentPassword }}</span>
      </div>

      <div class="password-form__field">
        <label class="password-form__label">Nova senha (6 ou mais caracteres)</label>
        <input
          v-model="newPassword"
          v-bind="newPasswordAttrs"
          type="password"
          class="password-form__input"
          :class="{ 'password-form__input--error': errors.newPassword }"
        />
        <span v-if="errors.newPassword" class="form-error-message">{{ errors.newPassword }}</span>
      </div>

      <div class="password-form__field">
        <label class="password-form__label">Confirmar nova senha</label>
        <input
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          type="password"
          class="password-form__input"
          :class="{ 'password-form__input--error': errors.confirmPassword }"
        />
        <span v-if="errors.confirmPassword" class="form-error-message">{{ errors.confirmPassword }}</span>
      </div>

      <div class="password-form__actions">
        <button type="submit" class="password-form__btn" :disabled="!meta.valid">Alterar senha</button>
      </div>
    </form>
  </div>
</template>
