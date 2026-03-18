import { ref } from 'vue'
import type { UserProfile } from '@/types'
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
  const { formatPhone, getInitial } = useInputMasks()

  const name = ref(props.user.name)
  const photo = ref(props.user.photo)
  const phone = ref(props.user.phone)
  const addressNumber = ref(props.user.addressNumber)

  const { cep, address, neighborhood, handleCEPInput } = useCepLookup(
    props.user.cep,
    props.user.address,
    props.user.neighborhood,
  )

  const { handleFileChange } = usePhotoUpload((url) => { photo.value = url })

  const handlePhoneInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    phone.value = formatPhone(target.value)
  }

  const handleSave = () => {
    emit('save', {
      name: name.value,
      photo: photo.value,
      phone: phone.value,
      cep: cep.value,
      address: address.value,
      addressNumber: addressNumber.value,
      neighborhood: neighborhood.value,
    })
  }

  return {
    name,
    photo,
    phone,
    cep,
    address,
    addressNumber,
    neighborhood,
    getInitial,
    handleFileChange,
    handlePhoneInput,
    handleCEPInput,
    handleSave,
  }
}
