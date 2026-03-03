<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import iconGoogle from '@/assets/images/icon-google.svg'
import { useInputMasks } from '@/composables'

const router = useRouter()
const { formatDate, formatCPF, formatPhone, formatCEP } = useInputMasks()

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
