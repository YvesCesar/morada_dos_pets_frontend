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

<style scoped>
.login-card {
  position: absolute;
  top: 64px;
  right: 124px;
  width: 522px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 40px 40px;
  background-color: var(--color-white);
  border-radius: 15px;
  z-index: 1;
}

.login-card__container {
  width: 100%;
  max-width: 442px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.login-card__header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-card__title {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.25;
}

.login-card__subtitle {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

.login-card__link {
  color: var(--color-text);
  text-decoration: underline;
  transition: opacity var(--transition-fast);
}

.login-card__link:hover {
  opacity: 0.7;
}

.login-card__error {
  color: var(--color-danger);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  margin-top: -16px;
}

.login-card__form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.login-card__inputs {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.login-card__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.login-card__label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

.login-card__input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  color: var(--color-text);
  background-color: var(--color-white);
  transition: border-color var(--transition-fast);
}

.login-card__input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.login-card__actions {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;
}

.login-card__checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-card__checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid var(--color-primary);
  border-radius: 2px;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.login-card__checkbox-label {
  font-size: var(--text-xs);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25;
  cursor: pointer;
}

.login-card__submit-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.login-card__button {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: 1.25;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.login-card__button:hover {
  opacity: 0.9;
}

.login-card__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-card__button--primary {
  padding: 8px 24px;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.login-card__button--google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 8px 65px;
  background-color: var(--color-white);
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  color: var(--color-text);
  font-weight: var(--font-medium);
}

.login-card__google-icon {
  width: 24px;
  height: 24px;
}

.login-card__forgot-link {
  font-size: var(--text-xs);
  font-weight: var(--font-regular);
  color: var(--color-text);
  text-decoration: none;
  transition: opacity var(--transition-fast);
  align-self: flex-start;
}

.login-card__forgot-link:hover {
  opacity: 0.7;
  text-decoration: underline;
}

.login-card__divider {
  display: flex;
  align-items: center;
  gap: 32px;
}

.login-card__divider-line {
  flex: 1;
  height: 1px;
  background-color: rgba(16, 13, 13, 0.6);
}

.login-card__divider-text {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

@media (max-width: 1400px) {
  .login-card {
    right: 80px;
    width: 480px;
  }
}

@media (max-width: 1200px) {
  .login-card {
    right: 40px;
    width: 450px;
    padding: 48px 32px 32px;
  }
}

@media (max-width: 992px) {
  .login-card {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    max-width: 522px;
    margin: 0 auto;
    padding: 40px 24px;
    border-radius: 15px;
  }

  .login-card__container {
    max-width: 100%;
  }

  .login-card__title {
    font-size: var(--text-2xl);
  }

  .login-card__subtitle {
    font-size: var(--text-lg);
  }

  .login-card__button--google {
    padding: 8px 40px;
  }
}

@media (max-width: 768px) {
  .login-card__divider {
    gap: 16px;
  }

  .login-card__divider-text {
    font-size: var(--text-lg);
  }

  .login-card__button--google {
    padding: 8px 24px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 24px var(--container-padding);
  }

  .login-card__container {
    gap: 32px;
  }

  .login-card__title {
    font-size: var(--text-xl);
  }

  .login-card__subtitle {
    font-size: var(--text-base);
  }
}
</style>
