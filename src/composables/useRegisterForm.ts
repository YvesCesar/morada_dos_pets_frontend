import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInputMasks } from './useInputMasks'
import { useCepLookup } from './useCepLookup'

/**
 * Composable para o formulário de registro multi-step
 */
export function useRegisterForm() {
  const router = useRouter()
  const { formatDate, formatCPF, formatPhone } = useInputMasks()
  const { cep, address: endereco, neighborhood: bairro, handleCEPInput } = useCepLookup()

  const currentStep = ref(1)

  // Etapa 1 - Credenciais
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  // Etapa 2 - Dados pessoais
  const nome = ref('')
  const dataNascimento = ref('')
  const cpf = ref('')
  const celular = ref('')
  const numero = ref('')

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

  const handleSubmit = () => {
    if (!isFormValid.value) return

    if (currentStep.value === 1) {
      currentStep.value = 2
    } else {
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

      router.push({ name: 'entrar' })
    }
  }

  const handleGoogleRegister = () => {
    console.log('Google register clicked')
  }

  return {
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
  }
}
