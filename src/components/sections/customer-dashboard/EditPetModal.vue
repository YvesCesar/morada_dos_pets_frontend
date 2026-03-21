<script setup lang="ts">
import { ref } from 'vue'
import type { DashboardPet } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { vMaska } from 'maska/vue'
import { MASKS } from '@/config/masks'
import { petSchema } from '@/schemas'
import { useInputMasks, usePhotoUpload } from '@/composables'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = defineProps<{
  pet: DashboardPet
}>()

const emit = defineEmits<{
  close: []
  save: [data: Partial<DashboardPet>]
}>()

const photo = ref(props.pet.photo)
const { getInitial } = useInputMasks()

const { handleSubmit, errors, defineField, meta } = useForm({
  validationSchema: toTypedSchema(petSchema),
  initialValues: {
    name: props.pet.name,
    birthDate: props.pet.birthDate,
    breed: props.pet.breed,
    weight: props.pet.weight,
  },
})

const [name, nameAttrs] = defineField('name')
const [birthDate, birthDateAttrs] = defineField('birthDate')
const [breed, breedAttrs] = defineField('breed')
const [weight, weightAttrs] = defineField('weight')

const { handleFileChange } = usePhotoUpload((url) => { photo.value = url })

const onSubmit = handleSubmit((values) => {
  emit('save', {
    name: values.name,
    birthDate: values.birthDate,
    breed: values.breed,
    weight: values.weight,
    photo: photo.value,
  })
})
</script>

<template>
  <BaseModal title="Editar Pet" @close="emit('close')">
    <form class="pet-form" @submit.prevent="onSubmit">
      <div class="pet-form__photo-area">
        <img
          v-if="photo"
          :src="photo"
          :alt="name"
          class="pet-form__photo-preview"
        />
        <span v-else class="pet-form__photo-preview pet-form__photo-preview--initial">
          {{ getInitial(name ?? '') }}
        </span>
        <label class="pet-form__change-photo">
          Alterar foto
          <input type="file" accept="image/*" hidden @change="handleFileChange" />
        </label>
      </div>

      <div class="pet-form__row">
        <div class="pet-form__field pet-form__field--name">
          <label class="pet-form__label">Nome</label>
          <input
            v-model="name"
            v-bind="nameAttrs"
            type="text"
            class="pet-form__input"
            :class="{ 'pet-form__input--error': errors.name }"
          />
          <span v-if="errors.name" class="form-error-message">{{ errors.name }}</span>
        </div>
        <div class="pet-form__field pet-form__field--date">
          <label class="pet-form__label">Data de nascimento</label>
          <input
            v-model="birthDate"
            v-bind="birthDateAttrs"
            v-maska="MASKS.date"
            type="text"
            class="pet-form__input"
            :class="{ 'pet-form__input--error': errors.birthDate }"
            placeholder="__/__/____"
          />
          <span v-if="errors.birthDate" class="form-error-message">{{ errors.birthDate }}</span>
        </div>
      </div>

      <div class="pet-form__row">
        <div class="pet-form__field pet-form__field--breed">
          <label class="pet-form__label">Raça</label>
          <input
            v-model="breed"
            v-bind="breedAttrs"
            type="text"
            class="pet-form__input"
            :class="{ 'pet-form__input--error': errors.breed }"
          />
          <span v-if="errors.breed" class="form-error-message">{{ errors.breed }}</span>
        </div>
        <div class="pet-form__field pet-form__field--weight">
          <label class="pet-form__label">Peso (kg)</label>
          <input
            v-model.number="weight"
            v-bind="weightAttrs"
            type="number"
            step="0.1"
            min="0"
            class="pet-form__input"
            :class="{ 'pet-form__input--error': errors.weight }"
          />
          <span v-if="errors.weight" class="form-error-message">{{ errors.weight }}</span>
        </div>
      </div>

      <div class="pet-form__actions">
        <button type="button" class="pet-form__btn pet-form__btn--cancel" @click="emit('close')">Cancelar</button>
        <button type="submit" class="pet-form__btn pet-form__btn--save" :disabled="!meta.valid">Salvar</button>
      </div>
    </form>
  </BaseModal>
</template>
