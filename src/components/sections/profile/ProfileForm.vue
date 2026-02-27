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

<style scoped>
.profile-form {
  background: var(--color-white);
  border-radius: 14px;
  padding: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.profile-form__photo-area {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.profile-form__photo {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.profile-form__photo--initial {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  color: var(--color-white);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
}

.profile-form__change-photo {
  font-size: var(--text-xs);
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
}

.profile-form__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.profile-form__row {
  display: flex;
  gap: var(--spacing-md);
}

.profile-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.profile-form__field--number {
  max-width: 120px;
}

.profile-form__label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.profile-form__input {
  padding: 10px 14px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-input);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  color: var(--color-text);
}

.profile-form__input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.profile-form__input--readonly {
  background: var(--color-bg-readonly);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.profile-form__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-sm);
}

.profile-form__btn {
  padding: 8px 24px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.profile-form__btn:hover {
  opacity: 0.9;
}

@media (max-width: 992px) {
  .profile-form {
    padding: var(--spacing-md);
  }
}

@media (max-width: 768px) {
  .profile-form__row {
    flex-direction: column;
  }

  .profile-form__field--number {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .profile-form {
    padding: var(--spacing-sm);
    border-radius: 10px;
  }

  .profile-form__photo-area {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-form__actions {
    justify-content: stretch;
  }

  .profile-form__btn {
    width: 100%;
    text-align: center;
  }
}
</style>
