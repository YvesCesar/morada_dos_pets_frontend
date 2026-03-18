<script setup lang="ts">
import iconGoogle from '@/assets/images/icon-google.svg'
import { useRegisterForm } from '@/composables'

const {
  currentStep,
  email,
  password,
  confirmPassword,
  nome,
  dataNascimento,
  cpf,
  celular,
  cep,
  endereco,
  numero,
  bairro,
  isPasswordValid,
  isPasswordMatch,
  isFormValid,
  handleDateInput,
  handleCPFInput,
  handlePhoneInput,
  handleCEPInput,
  handleSubmit,
  handleGoogleRegister,
} = useRegisterForm()
</script>

<template>
  <section class="register-card">
    <div class="register-card__container">
      <div class="register-card__header">
        <span class="register-card__step">Etapa {{ currentStep }} de 2</span>
        <h2 class="register-card__title">Criar conta</h2>
      </div>

      <form class="register-card__form" @submit.prevent="handleSubmit">
        <!-- Etapa 1 - Credenciais -->
        <template v-if="currentStep === 1">
          <div class="register-card__inputs">
            <div class="register-card__field">
              <label for="email" class="register-card__label">E-mail</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="register-card__input"
                autocomplete="email"
                required
              />
            </div>

            <div class="register-card__field">
              <label for="password" class="register-card__label">Senha (6 ou mais caracteres)</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="register-card__input"
                :class="{ 'register-card__input--error': password && !isPasswordValid }"
                autocomplete="new-password"
                required
              />
            </div>
          </div>

          <div class="register-card__actions">
            <div class="register-card__field">
              <label for="confirm-password" class="register-card__label">Confirmar senha</label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                class="register-card__input"
                :class="{ 'register-card__input--error': confirmPassword && !isPasswordMatch }"
                autocomplete="new-password"
                required
              />
            </div>

            <div class="register-card__submit-area">
              <button
                type="submit"
                class="register-card__button register-card__button--primary"
                :disabled="!isFormValid"
              >
                Continuar
              </button>
            </div>
          </div>
        </template>

        <!-- Etapa 2 - Dados pessoais e contato -->
        <template v-else>
          <div class="register-card__section">
            <h3 class="register-card__section-title">Dados pessoais</h3>

            <div class="register-card__field">
              <label for="nome" class="register-card__label">Nome</label>
              <input
                id="nome"
                v-model="nome"
                type="text"
                class="register-card__input"
                autocomplete="name"
                required
              />
            </div>

            <div class="register-card__row">
              <div class="register-card__field register-card__field--date">
                <label for="dataNascimento" class="register-card__label">Data de nascimento</label>
                <input
                  id="dataNascimento"
                  :value="dataNascimento"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  placeholder="__ / __ / __"
                  maxlength="10"
                  @input="handleDateInput"
                  required
                />
              </div>

              <div class="register-card__field register-card__field--cpf">
                <label for="cpf" class="register-card__label">CPF</label>
                <input
                  id="cpf"
                  :value="cpf"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  placeholder="___.___.___-__"
                  maxlength="14"
                  @input="handleCPFInput"
                  required
                />
              </div>
            </div>
          </div>

          <div class="register-card__section">
            <div class="register-card__section-header">
              <h3 class="register-card__section-title">Contato</h3>
              <span class="register-card__section-line"></span>
            </div>

            <div class="register-card__row">
              <div class="register-card__field register-card__field--phone">
                <label for="celular" class="register-card__label">Celular</label>
                <input
                  id="celular"
                  :value="celular"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  placeholder="(__) _____-____"
                  maxlength="15"
                  @input="handlePhoneInput"
                  required
                />
              </div>

              <div class="register-card__field register-card__field--cep">
                <label for="cep" class="register-card__label">CEP</label>
                <input
                  id="cep"
                  :value="cep"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  placeholder="_____-___"
                  maxlength="9"
                  @input="handleCEPInput"
                  required
                />
              </div>
            </div>

            <div class="register-card__row">
              <div class="register-card__field register-card__field--address">
                <label for="endereco" class="register-card__label">Endereço</label>
                <input
                  id="endereco"
                  v-model="endereco"
                  type="text"
                  class="register-card__input"
                  autocomplete="street-address"
                  required
                />
              </div>

              <div class="register-card__field register-card__field--number">
                <label for="numero" class="register-card__label">Número</label>
                <input
                  id="numero"
                  v-model="numero"
                  type="text"
                  class="register-card__input"
                  required
                />
              </div>
            </div>

            <div class="register-card__field">
              <label for="bairro" class="register-card__label">Bairro</label>
              <input
                id="bairro"
                v-model="bairro"
                type="text"
                class="register-card__input"
                required
              />
            </div>

            <div class="register-card__submit-area">
              <button
                type="submit"
                class="register-card__button register-card__button--primary"
                :disabled="!isFormValid"
              >
                Continuar
              </button>
            </div>
          </div>
        </template>
      </form>

      <!-- Divisor e Google - apenas na etapa 1 -->
      <template v-if="currentStep === 1">
        <div class="register-card__divider">
          <span class="register-card__divider-line"></span>
          <span class="register-card__divider-text">OU</span>
          <span class="register-card__divider-line"></span>
        </div>

        <button
          type="button"
          class="register-card__button register-card__button--google"
          @click="handleGoogleRegister"
        >
          <img :src="iconGoogle" alt="Google" class="register-card__google-icon" />
          Continuar com o Google
        </button>
      </template>
    </div>
  </section>
</template>
