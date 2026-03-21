<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { MASKS } from '@/config/masks'
import iconGoogle from '@/assets/images/icon-google.svg'
import { useRegisterForm } from '@/composables'

const {
  currentStep,
  email,
  emailAttrs,
  password,
  passwordAttrs,
  confirmPassword,
  confirmPasswordAttrs,
  nome,
  nomeAttrs,
  dataNascimento,
  dataNascimentoAttrs,
  cpf,
  cpfAttrs,
  celular,
  celularAttrs,
  cep,
  cepAttrs,
  endereco,
  enderecoAttrs,
  numero,
  numeroAttrs,
  bairro,
  bairroAttrs,
  step1Errors,
  step1Meta,
  step2Errors,
  step2Meta,
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
                v-bind="emailAttrs"
                type="email"
                class="register-card__input"
                :class="{ 'register-card__input--error': step1Errors.email }"
                autocomplete="email"
              />
              <span v-if="step1Errors.email" class="form-error-message" aria-live="polite">{{ step1Errors.email }}</span>
            </div>

            <div class="register-card__field">
              <label for="password" class="register-card__label">Senha (6 ou mais caracteres)</label>
              <input
                id="password"
                v-model="password"
                v-bind="passwordAttrs"
                type="password"
                class="register-card__input"
                :class="{ 'register-card__input--error': step1Errors.password }"
                autocomplete="new-password"
              />
              <span v-if="step1Errors.password" class="form-error-message" aria-live="polite">{{ step1Errors.password }}</span>
            </div>
          </div>

          <div class="register-card__actions">
            <div class="register-card__field">
              <label for="confirm-password" class="register-card__label">Confirmar senha</label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                type="password"
                class="register-card__input"
                :class="{ 'register-card__input--error': step1Errors.confirmPassword }"
                autocomplete="new-password"
              />
              <span v-if="step1Errors.confirmPassword" class="form-error-message" aria-live="polite">{{ step1Errors.confirmPassword }}</span>
            </div>

            <div class="register-card__submit-area">
              <button
                type="submit"
                class="register-card__button register-card__button--primary"
                :disabled="!step1Meta.valid"
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
                v-bind="nomeAttrs"
                type="text"
                class="register-card__input"
                :class="{ 'register-card__input--error': step2Errors.nome }"
                autocomplete="name"
              />
              <span v-if="step2Errors.nome" class="form-error-message" aria-live="polite">{{ step2Errors.nome }}</span>
            </div>

            <div class="register-card__row">
              <div class="register-card__field register-card__field--date">
                <label for="dataNascimento" class="register-card__label">Data de nascimento</label>
                <input
                  id="dataNascimento"
                  v-model="dataNascimento"
                  v-bind="dataNascimentoAttrs"
                  v-maska="MASKS.date"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  :class="{ 'register-card__input--error': step2Errors.dataNascimento }"
                  placeholder="__ / __ / __"
                />
                <span v-if="step2Errors.dataNascimento" class="form-error-message" aria-live="polite">{{ step2Errors.dataNascimento }}</span>
              </div>

              <div class="register-card__field register-card__field--cpf">
                <label for="cpf" class="register-card__label">CPF</label>
                <input
                  id="cpf"
                  v-model="cpf"
                  v-bind="cpfAttrs"
                  v-maska="MASKS.cpf"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  :class="{ 'register-card__input--error': step2Errors.cpf }"
                  placeholder="___.___.___-__"
                />
                <span v-if="step2Errors.cpf" class="form-error-message" aria-live="polite">{{ step2Errors.cpf }}</span>
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
                  v-model="celular"
                  v-bind="celularAttrs"
                  v-maska="MASKS.phone"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  :class="{ 'register-card__input--error': step2Errors.celular }"
                  placeholder="(__) _____-____"
                />
                <span v-if="step2Errors.celular" class="form-error-message" aria-live="polite">{{ step2Errors.celular }}</span>
              </div>

              <div class="register-card__field register-card__field--cep">
                <label for="cep" class="register-card__label">CEP</label>
                <input
                  id="cep"
                  v-model="cep"
                  v-bind="cepAttrs"
                  v-maska="MASKS.cep"
                  type="text"
                  class="register-card__input register-card__input--masked"
                  :class="{ 'register-card__input--error': step2Errors.cep }"
                  placeholder="_____-___"
                  @maska="handleCEPInput"
                />
                <span v-if="step2Errors.cep" class="form-error-message" aria-live="polite">{{ step2Errors.cep }}</span>
              </div>
            </div>

            <div class="register-card__row">
              <div class="register-card__field register-card__field--address">
                <label for="endereco" class="register-card__label">Endereço</label>
                <input
                  id="endereco"
                  v-model="endereco"
                  v-bind="enderecoAttrs"
                  type="text"
                  class="register-card__input"
                  :class="{ 'register-card__input--error': step2Errors.endereco }"
                  autocomplete="street-address"
                />
                <span v-if="step2Errors.endereco" class="form-error-message" aria-live="polite">{{ step2Errors.endereco }}</span>
              </div>

              <div class="register-card__field register-card__field--number">
                <label for="numero" class="register-card__label">Número</label>
                <input
                  id="numero"
                  v-model="numero"
                  v-bind="numeroAttrs"
                  type="text"
                  class="register-card__input"
                  :class="{ 'register-card__input--error': step2Errors.numero }"
                />
                <span v-if="step2Errors.numero" class="form-error-message" aria-live="polite">{{ step2Errors.numero }}</span>
              </div>
            </div>

            <div class="register-card__field">
              <label for="bairro" class="register-card__label">Bairro</label>
              <input
                id="bairro"
                v-model="bairro"
                v-bind="bairroAttrs"
                type="text"
                class="register-card__input"
                :class="{ 'register-card__input--error': step2Errors.bairro }"
              />
              <span v-if="step2Errors.bairro" class="form-error-message" aria-live="polite">{{ step2Errors.bairro }}</span>
            </div>

            <div class="register-card__submit-area">
              <button
                type="submit"
                class="register-card__button register-card__button--primary"
                :disabled="!step2Meta.valid"
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
