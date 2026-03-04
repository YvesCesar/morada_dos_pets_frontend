<script setup lang="ts">
import { ref } from 'vue'
import type { UserProfile } from '@/types'
import { useInputMasks, usePhotoUpload } from '@/composables'

const props = defineProps<{
  user: UserProfile
}>()

const emit = defineEmits<{
  save: [data: Partial<UserProfile>]
}>()

const { formatPhone, formatCEP } = useInputMasks()
const { handleFileChange } = usePhotoUpload((url) => { photo.value = url })

const name = ref(props.user.name)
const photo = ref(props.user.photo)
const phone = ref(props.user.phone)
const cep = ref(props.user.cep)
const address = ref(props.user.address)
const addressNumber = ref(props.user.addressNumber)
const neighborhood = ref(props.user.neighborhood)

const handlePhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  phone.value = formatPhone(target.value)
}

const handleCEPInput = async (event: Event) => {
  const target = event.target as HTMLInputElement
  cep.value = formatCEP(target.value)

  const cepNumbers = cep.value.replace(/\D/g, '')
  if (cepNumbers.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`)
      const data = await response.json()
      if (!data.erro) {
        address.value = data.logradouro || ''
        neighborhood.value = data.bairro || ''
      }
    } catch {
      /* ignore */
    }
  }
}

const getInitial = (n: string) => n.charAt(0).toUpperCase()

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
</script>

<template>
  <div class="profile-form">
    <div class="profile-form__photo-area">
      <img
        v-if="photo"
        :src="photo"
        :alt="name"
        class="profile-form__photo"
      />
      <span v-else class="profile-form__photo profile-form__photo--initial">
        {{ getInitial(name) }}
      </span>
      <label class="profile-form__change-photo">
        Alterar foto
        <input type="file" accept="image/*" hidden @change="handleFileChange" />
      </label>
    </div>

    <form class="profile-form__form" @submit.prevent="handleSave">
      <div class="profile-form__field">
        <label class="profile-form__label">Nome</label>
        <input v-model="name" type="text" class="profile-form__input" />
      </div>

      <div class="profile-form__field">
        <label class="profile-form__label">E-mail</label>
        <input :value="user.email" type="email" class="profile-form__input profile-form__input--readonly" readonly />
      </div>

      <div class="profile-form__row">
        <div class="profile-form__field">
          <label class="profile-form__label">Data de nascimento</label>
          <input :value="user.birthDate" type="text" class="profile-form__input profile-form__input--readonly" readonly />
        </div>

        <div class="profile-form__field">
          <label class="profile-form__label">CPF</label>
          <input :value="user.cpf" type="text" class="profile-form__input profile-form__input--readonly" readonly />
        </div>
      </div>

      <div class="profile-form__row">
        <div class="profile-form__field">
          <label class="profile-form__label">Celular</label>
          <input :value="phone" type="text" class="profile-form__input" maxlength="15" @input="handlePhoneInput" />
        </div>

        <div class="profile-form__field">
          <label class="profile-form__label">CEP</label>
          <input :value="cep" type="text" class="profile-form__input" maxlength="9" @input="handleCEPInput" />
        </div>
      </div>

      <div class="profile-form__row">
        <div class="profile-form__field profile-form__field--address">
          <label class="profile-form__label">Endereço</label>
          <input v-model="address" type="text" class="profile-form__input" />
        </div>

        <div class="profile-form__field profile-form__field--number">
          <label class="profile-form__label">Número</label>
          <input v-model="addressNumber" type="text" class="profile-form__input" />
        </div>
      </div>

      <div class="profile-form__field">
        <label class="profile-form__label">Bairro</label>
        <input v-model="neighborhood" type="text" class="profile-form__input" />
      </div>

      <div class="profile-form__actions">
        <button type="submit" class="profile-form__btn">Salvar alterações</button>
      </div>
    </form>
  </div>
</template>
