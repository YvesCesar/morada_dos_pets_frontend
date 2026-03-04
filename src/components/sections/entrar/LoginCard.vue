<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import iconGoogle from '@/assets/images/icon-google.svg'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const isFormValid = computed(() => email.value !== '' && password.value !== '')

const handleSubmit = () => {
  const success = authStore.login(email.value, password.value)
  if (success) {
    const route = authStore.isAdmin ? '/dashboard/admin' : '/dashboard/cliente'
    router.push(route)
  }
}

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

      <p v-if="authStore.error" class="login-card__error">{{ authStore.error }}</p>

      <form class="login-card__form" @submit.prevent="handleSubmit">
        <div class="login-card__inputs">
          <div class="login-card__field">
            <label for="email" class="login-card__label">E-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="login-card__input"
              autocomplete="email"
            />
          </div>

          <div class="login-card__field">
            <label for="password" class="login-card__label">Senha</label>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="login-card__input"
              autocomplete="current-password"
            />
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
            <button type="submit" class="login-card__button login-card__button--primary" :disabled="!isFormValid">
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
