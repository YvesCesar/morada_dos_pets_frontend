import { ref } from 'vue'
import type { UserProfile } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { profileSchema } from '@/schemas'
import { useInputMasks } from './useInputMasks'
import { usePhotoUpload } from './usePhotoUpload'
import { useCepLookup } from './useCepLookup'

/**
 * Composable para o formulário de perfil
 */
export function useProfileForm(
  props: { user: UserProfile },
  emit: (event: 'save', data: Partial<UserProfile>) => void,
) {
  const { getInitial } = useInputMasks()

  const photo = ref(props.user.photo)

  const { handleSubmit, errors, defineField, setFieldValue, meta } = useForm({
    validationSchema: toTypedSchema(profileSchema),
    initialValues: {
      name: props.user.name,
      phone: props.user.phone,
      cep: props.user.cep,
      address: props.user.address,
      addressNumber: props.user.addressNumber,
      neighborhood: props.user.neighborhood,
    },
  })

  const [name, nameAttrs] = defineField('name')
  const [phone, phoneAttrs] = defineField('phone')
  const [cep, cepAttrs] = defineField('cep')
  const [address, addressAttrs] = defineField('address')
  const [addressNumber, addressNumberAttrs] = defineField('addressNumber')
  const [neighborhood, neighborhoodAttrs] = defineField('neighborhood')

  const { handleFileChange } = usePhotoUpload((url) => { photo.value = url })

  const { lookupCep } = useCepLookup((addressValue, neighborhoodValue) => {
    setFieldValue('address', addressValue)
    setFieldValue('neighborhood', neighborhoodValue)
  })

  const handleCEPInput = async () => {
    const cepValue = cep.value ?? ''
    const cepNumbers = cepValue.replace(/\D/g, '')
    if (cepNumbers.length === 8) {
      await lookupCep(cepNumbers)
    }
  }

  const handleSave = handleSubmit((values) => {
    emit('save', {
      name: values.name,
      photo: photo.value,
      phone: values.phone,
      cep: values.cep,
      address: values.address,
      addressNumber: values.addressNumber,
      neighborhood: values.neighborhood,
    })
  })

  return {
    name,
    nameAttrs,
    photo,
    phone,
    phoneAttrs,
    cep,
    cepAttrs,
    address,
    addressAttrs,
    addressNumber,
    addressNumberAttrs,
    neighborhood,
    neighborhoodAttrs,
    errors,
    meta,
    getInitial,
    handleFileChange,
    handleCEPInput,
    handleSave,
  }
}
