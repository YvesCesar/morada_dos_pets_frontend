<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { MASKS } from '@/config/masks'
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
        {{ getInitial(name ?? '') }}
      </span>
      <label class="profile-form__change-photo">
        Alterar foto
        <input type="file" accept="image/*" hidden @change="handleFileChange" />
      </label>
    </div>

    <form class="profile-form__form" @submit.prevent="handleSave">
      <div class="profile-form__field">
        <label class="profile-form__label">Nome</label>
        <input
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          class="profile-form__input"
          :class="{ 'profile-form__input--error': errors.name }"
        />
        <span v-if="errors.name" class="form-error-message">{{ errors.name }}</span>
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
          <input
            v-model="phone"
            v-bind="phoneAttrs"
            v-maska="MASKS.phone"
            type="text"
            class="profile-form__input"
            :class="{ 'profile-form__input--error': errors.phone }"
          />
          <span v-if="errors.phone" class="form-error-message">{{ errors.phone }}</span>
        </div>

        <div class="profile-form__field">
          <label class="profile-form__label">CEP</label>
          <input
            v-model="cep"
            v-bind="cepAttrs"
            v-maska="MASKS.cep"
            type="text"
            class="profile-form__input"
            :class="{ 'profile-form__input--error': errors.cep }"
            @maska="handleCEPInput"
          />
          <span v-if="errors.cep" class="form-error-message">{{ errors.cep }}</span>
        </div>
      </div>

      <div class="profile-form__row">
        <div class="profile-form__field profile-form__field--address">
          <label class="profile-form__label">Endereço</label>
          <input
            v-model="address"
            v-bind="addressAttrs"
            type="text"
            class="profile-form__input"
            :class="{ 'profile-form__input--error': errors.address }"
          />
          <span v-if="errors.address" class="form-error-message">{{ errors.address }}</span>
        </div>

        <div class="profile-form__field profile-form__field--number">
          <label class="profile-form__label">Número</label>
          <input
            v-model="addressNumber"
            v-bind="addressNumberAttrs"
            type="text"
            class="profile-form__input"
            :class="{ 'profile-form__input--error': errors.addressNumber }"
          />
          <span v-if="errors.addressNumber" class="form-error-message">{{ errors.addressNumber }}</span>
        </div>
      </div>

      <div class="profile-form__field">
        <label class="profile-form__label">Bairro</label>
        <input
          v-model="neighborhood"
          v-bind="neighborhoodAttrs"
          type="text"
          class="profile-form__input"
          :class="{ 'profile-form__input--error': errors.neighborhood }"
        />
        <span v-if="errors.neighborhood" class="form-error-message">{{ errors.neighborhood }}</span>
      </div>

      <div class="profile-form__actions">
        <button type="submit" class="profile-form__btn" :disabled="!meta.valid">Salvar alterações</button>
      </div>
    </form>
  </div>
</template>
