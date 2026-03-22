<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema } from '@/schemas'
import iconGoogle from '@/assets/images/icon-google.svg'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)

const { handleSubmit, errors, defineField, meta } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => {
  const success = authStore.login(values.email, values.password)
  if (success) {
    const route = authStore.isAdmin ? '/dashboard/admin' : '/dashboard/cliente'
    router.push(route)
  }
})

const handleGoogleLogin = () => {
  console.log('Google login clicked')
}
</script>

<template>
  <section class="login-card">
    <div class="login-card__container">
      <div class="login-card__header">
        <h2 class="login-card__title">Entrar</h2>
        <p class="login-card__subtitle">
          Novo usuário?
          <router-link to="/cadastro" class="login-card__link">Crie uma conta</router-link>
        </p>
      </div>

      <p v-if="authStore.error" class="login-card__error" role="alert">{{ authStore.error }}</p>

      <form class="login-card__form" @submit.prevent="onSubmit">
        <div class="login-card__inputs">
          <div class="login-card__field">
            <label for="email" class="login-card__label">E-mail</label>
            <input
              id="email"
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              class="login-card__input"
              :class="{ 'login-card__input--error': errors.email }"
              autocomplete="email"
            />
            <span v-if="errors.email" class="form-error-message" aria-live="polite">{{ errors.email }}</span>
          </div>

          <div class="login-card__field">
            <label for="password" class="login-card__label">Senha</label>
            <input
              id="password"
              v-model="password"
              v-bind="passwordAttrs"
              :type="showPassword ? 'text' : 'password'"
              class="login-card__input"
              :class="{ 'login-card__input--error': errors.password }"
              autocomplete="current-password"
            />
            <span v-if="errors.password" class="form-error-message" aria-live="polite">{{ errors.password }}</span>
          </div>
        </div>

        <div class="login-card__actions">
          <div class="login-card__checkbox-wrapper">
            <input
              id="show-password"
              v-model="showPassword"
              type="checkbox"
              class="login-card__checkbox"
            />
            <label for="show-password" class="login-card__checkbox-label">Mostrar senha</label>
          </div>

          <div class="login-card__submit-area">
            <button type="submit" class="login-card__button login-card__button--primary" :disabled="!meta.valid">
              Continuar
            </button>
          </div>

          <router-link to="/esqueci-senha" class="login-card__forgot-link">
            Esqueceu a senha?
          </router-link>
        </div>
      </form>

      <div class="login-card__divider">
        <span class="login-card__divider-line"></span>
        <span class="login-card__divider-text">OU</span>
        <span class="login-card__divider-line"></span>
      </div>

      <button type="button" class="login-card__button login-card__button--google" @click="handleGoogleLogin">
        <img :src="iconGoogle" alt="Google" class="login-card__google-icon" />
        Continuar com o Google
      </button>
    </div>
  </section>
</template>
