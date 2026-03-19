import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerStep1Schema, registerStep2Schema } from '@/schemas'
import { useCepLookup } from './useCepLookup'

/**
 * Composable para o formulário de registro multi-step
 */
export function useRegisterForm() {
  const router = useRouter()
  const currentStep = ref(1)

  // Step 1 form
  const step1Form = useForm({
    validationSchema: toTypedSchema(registerStep1Schema),
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [email, emailAttrs] = step1Form.defineField('email')
  const [password, passwordAttrs] = step1Form.defineField('password')
  const [confirmPassword, confirmPasswordAttrs] = step1Form.defineField('confirmPassword')

  // Step 2 form
  const step2Form = useForm({
    validationSchema: toTypedSchema(registerStep2Schema),
    initialValues: {
      nome: '',
      dataNascimento: '',
      cpf: '',
      celular: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
    },
  })

  const [nome, nomeAttrs] = step2Form.defineField('nome')
  const [dataNascimento, dataNascimentoAttrs] = step2Form.defineField('dataNascimento')
  const [cpf, cpfAttrs] = step2Form.defineField('cpf')
  const [celular, celularAttrs] = step2Form.defineField('celular')
  const [cep, cepAttrs] = step2Form.defineField('cep')
  const [endereco, enderecoAttrs] = step2Form.defineField('endereco')
  const [numero, numeroAttrs] = step2Form.defineField('numero')
  const [bairro, bairroAttrs] = step2Form.defineField('bairro')

  const { lookupCep } = useCepLookup((addressValue, neighborhoodValue) => {
    step2Form.setFieldValue('endereco', addressValue)
    step2Form.setFieldValue('bairro', neighborhoodValue)
  })

  const handleCEPInput = async () => {
    const cepValue = cep.value ?? ''
    const cepNumbers = cepValue.replace(/\D/g, '')
    if (cepNumbers.length === 8) {
      await lookupCep(cepNumbers)
    }
  }

  const handleSubmit = async () => {
    if (currentStep.value === 1) {
      const result = await step1Form.validate()
      if (result.valid) {
        currentStep.value = 2
      }
    } else {
      const result = await step2Form.validate()
      if (result.valid) {
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
  }

  const handleGoogleRegister = () => {
    console.log('Google register clicked')
  }

  return {
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
    step1Errors: step1Form.errors,
    step1Meta: step1Form.meta,
    step2Errors: step2Form.errors,
    step2Meta: step2Form.meta,
    handleCEPInput,
    handleSubmit,
    handleGoogleRegister,
  }
}
