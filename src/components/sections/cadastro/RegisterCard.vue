<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import iconGoogle from '@/assets/images/icon-google.svg'

const router = useRouter()

// Controle de etapa
const currentStep = ref(1)

// Etapa 1 - Credenciais
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Etapa 2 - Dados pessoais e contato
const nome = ref('')
const dataNascimento = ref('')
const cpf = ref('')
const celular = ref('')
const cep = ref('')
const endereco = ref('')
const numero = ref('')
const bairro = ref('')

// Validações Etapa 1
const isPasswordValid = computed(() => password.value.length >= 6)
const isPasswordMatch = computed(() => password.value === confirmPassword.value && confirmPassword.value !== '')
const isStep1Valid = computed(() => email.value !== '' && isPasswordValid.value && isPasswordMatch.value)

// Validações Etapa 2
const isStep2Valid = computed(() => {
  return (
    nome.value !== '' &&
    dataNascimento.value.length === 10 &&
    cpf.value.length === 14 &&
    celular.value.length >= 14 &&
    cep.value.length === 9 &&
    endereco.value !== '' &&
    numero.value !== '' &&
    bairro.value !== ''
  )
})

const isFormValid = computed(() => currentStep.value === 1 ? isStep1Valid.value : isStep2Valid.value)

// Máscaras de input
const formatDate = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
}

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
}

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 2) return numbers.length ? `(${numbers}` : ''
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

const formatCEP = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 5) return numbers
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
}

// Handlers de input com máscara
const handleDateInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  dataNascimento.value = formatDate(target.value)
}

const handleCPFInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  cpf.value = formatCPF(target.value)
}

const handlePhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  celular.value = formatPhone(target.value)
}

const handleCEPInput = async (event: Event) => {
  const target = event.target as HTMLInputElement
  cep.value = formatCEP(target.value)

  // Buscar endereço pelo CEP
  const cepNumbers = cep.value.replace(/\D/g, '')
  if (cepNumbers.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`)
      const data = await response.json()
      if (!data.erro) {
        endereco.value = data.logradouro || ''
        bairro.value = data.bairro || ''
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
    }
  }
}

const handleSubmit = () => {
  if (!isFormValid.value) return

  if (currentStep.value === 1) {
    // Avança para etapa 2
    currentStep.value = 2
  } else {
    // Finaliza cadastro
    console.log('Cadastro completo:', {
      email: email.value,
      password: password.value,
      nome: nome.value,
      dataNascimento: dataNascimento.value,
      cpf: cpf.value,
      celular: celular.value,
      cep: cep.value,
      endereco: endereco.value,
      numero: numero.value,
      bairro: bairro.value,
    })

    // Redirecionar para login
    router.push({ name: 'entrar' })
  }
}

const handleGoogleRegister = () => {
  console.log('Google register clicked')
}
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

<style scoped>
.register-card {
  position: relative;
  width: 522px;
  margin-top: 64px;
  margin-left: auto;
  margin-right: 124px;
  margin-bottom: 96px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 40px 40px;
  background-color: var(--color-white);
  border-radius: 15px;
  z-index: 1;
}

.register-card__container {
  width: 100%;
  max-width: 442px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.register-card__header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.register-card__step {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

.register-card__title {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.25;
}

.register-card__form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.register-card__inputs {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.register-card__section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.register-card__section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.register-card__section-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.25;
  white-space: nowrap;
}

.register-card__section-line {
  flex: 1;
  height: 1px;
  background-color: rgba(16, 13, 13, 0.6);
}

.register-card__row {
  display: flex;
  gap: 24px;
}

.register-card__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.register-card__field--date {
  width: 157px;
  flex-shrink: 0;
}

.register-card__field--cpf {
  width: 188px;
  flex-shrink: 0;
}

.register-card__field--phone {
  width: 204px;
  flex-shrink: 0;
}

.register-card__field--cep {
  width: 150px;
  flex-shrink: 0;
}

.register-card__field--address {
  flex: 1;
  max-width: 308px;
}

.register-card__field--number {
  width: 109px;
  flex-shrink: 0;
}

.register-card__label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

.register-card__input {
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

.register-card__input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.register-card__input--error {
  border-color: #e74c3c;
}

.register-card__input--masked {
  padding: 10px 24px;
}

.register-card__input--masked::placeholder {
  font-weight: 300;
  font-size: var(--text-base);
  color: rgba(0, 0, 0, 0.55);
}

.register-card__actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.register-card__submit-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.register-card__button {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: 1.25;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.register-card__button:hover:not(:disabled) {
  opacity: 0.9;
}

.register-card__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.register-card__button--primary {
  padding: 8px 24px;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.register-card__button--google {
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

.register-card__google-icon {
  width: 24px;
  height: 24px;
}

.register-card__divider {
  display: flex;
  align-items: center;
  gap: 32px;
}

.register-card__divider-line {
  flex: 1;
  height: 1px;
  background-color: rgba(16, 13, 13, 0.6);
}

.register-card__divider-text {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
}

@media (max-width: 1400px) {
  .register-card {
    margin-right: 80px;
    width: 480px;
  }
}

@media (max-width: 1200px) {
  .register-card {
    margin-right: 40px;
    width: 450px;
    padding: 48px 32px 32px;
  }
}

@media (max-width: 992px) {
  .register-card {
    width: 100%;
    max-width: 522px;
    margin: 0 auto;
    padding: 40px 24px;
    border-radius: 15px;
  }

  .register-card__container {
    max-width: 100%;
  }

  .register-card__title {
    font-size: var(--text-2xl);
  }

  .register-card__step {
    font-size: var(--text-lg);
  }

  .register-card__button--google {
    padding: 8px 40px;
  }

  .register-card__row {
    flex-wrap: wrap;
  }

  .register-card__field--date,
  .register-card__field--cpf,
  .register-card__field--phone,
  .register-card__field--cep,
  .register-card__field--address,
  .register-card__field--number {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .register-card__divider {
    gap: 16px;
  }

  .register-card__divider-text {
    font-size: var(--text-lg);
  }

  .register-card__button--google {
    padding: 8px 24px;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 24px var(--container-padding);
  }

  .register-card__container {
    gap: 32px;
  }

  .register-card__title {
    font-size: var(--text-xl);
  }

  .register-card__step {
    font-size: var(--text-base);
  }
}
</style>
