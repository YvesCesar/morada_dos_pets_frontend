<script setup lang="ts">
import type { UserProfile } from '@/types'
import { useProfileForm } from '@/composables'

const props = defineProps<{
  user: UserProfile
}>()

const emit = defineEmits<{
  save: [data: Partial<UserProfile>]
}>()

const {
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
} = useProfileForm(props, (_, data) => emit('save', data))
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
