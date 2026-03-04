<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePhotoUpload } from '@/composables'
import { useAuthStore } from '@/stores/auth'
import { useTestimonialsStore } from '@/stores/testimonials'

const authStore = useAuthStore()
const testimonialsStore = useTestimonialsStore()

const userId = computed(() => authStore.user?.id ?? '')
const testimonial = computed(() => testimonialsStore.getByUser(userId.value))

const isEditing = ref(false)
const quoteInput = ref('')
const allowPublicInput = ref(false)
const photoInput = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const { handleFileChange: handlePhotoChange } = usePhotoUpload((url) => { photoInput.value = url })

const startEdit = () => {
  quoteInput.value = testimonial.value?.quote ?? ''
  allowPublicInput.value = testimonial.value?.allowPublic ?? false
  photoInput.value = testimonial.value?.authorPhoto ?? ''
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const save = () => {
  if (!quoteInput.value.trim()) return
  testimonialsStore.submitTestimonial(
    userId.value,
    authStore.user?.name ?? '',
    photoInput.value,
    quoteInput.value.trim(),
    allowPublicInput.value,
  )
  isEditing.value = false
}

const updateAllowPublic = (value: boolean) => {
  if (!testimonial.value) return
  testimonialsStore.submitTestimonial(
    userId.value,
    authStore.user?.name ?? '',
    testimonial.value.authorPhoto,
    testimonial.value.quote,
    value,
  )
}

const statusLabel = computed(() => {
  if (!testimonial.value) return ''
  if (!testimonial.value.allowPublic) return 'Não autorizado'
  return testimonial.value.approved ? 'Publicado' : 'Aguardando aprovação'
})

const statusClass = computed(() => {
  if (!testimonial.value) return ''
  if (!testimonial.value.allowPublic) return 'customer-testimonial__status--neutral'
  return testimonial.value.approved
    ? 'customer-testimonial__status--approved'
    : 'customer-testimonial__status--pending'
})
</script>

<template>
  <div class="customer-testimonial">
    <h3 class="customer-testimonial__title">Meu Depoimento</h3>

    <!-- No testimonial yet: show form -->
    <template v-if="!testimonial">
      <p class="customer-testimonial__hint">
        Compartilhe sua experiência com a Morada dos Pets!
      </p>
      <div class="customer-testimonial__form">
        <div class="customer-testimonial__photo-field">
          <div class="customer-testimonial__photo-preview" @click="fileInputRef?.click()">
            <img
              v-if="photoInput"
              :src="photoInput"
              alt="Foto"
              class="customer-testimonial__photo-img"
            />
            <div v-else class="customer-testimonial__photo-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div class="customer-testimonial__photo-overlay">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="customer-testimonial__file-input"
            @change="handlePhotoChange"
          />
          <span class="customer-testimonial__photo-hint">Foto para o depoimento (opcional)</span>
        </div>

        <textarea
          v-model="quoteInput"
          class="customer-testimonial__textarea"
          rows="4"
          placeholder="Escreva seu depoimento..."
        />
        <label class="customer-testimonial__toggle">
          <input type="checkbox" v-model="allowPublicInput" />
          <span>Autorizar uso no site</span>
        </label>
        <button
          class="customer-testimonial__btn"
          :disabled="!quoteInput.trim()"
          @click="save"
        >
          Salvar depoimento
        </button>
      </div>
    </template>

    <!-- Has testimonial -->
    <template v-else>
      <!-- Editing mode -->
      <div v-if="isEditing" class="customer-testimonial__form">
        <div class="customer-testimonial__photo-field">
          <div class="customer-testimonial__photo-preview" @click="fileInputRef?.click()">
            <img
              v-if="photoInput"
              :src="photoInput"
              alt="Foto"
              class="customer-testimonial__photo-img"
            />
            <div v-else class="customer-testimonial__photo-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div class="customer-testimonial__photo-overlay">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="customer-testimonial__file-input"
            @change="handlePhotoChange"
          />
          <span class="customer-testimonial__photo-hint">Foto para o depoimento (opcional)</span>
        </div>

        <textarea
          v-model="quoteInput"
          class="customer-testimonial__textarea"
          rows="4"
        />
        <label class="customer-testimonial__toggle">
          <input type="checkbox" v-model="allowPublicInput" />
          <span>Autorizar uso no site</span>
        </label>
        <div class="customer-testimonial__actions">
          <button class="customer-testimonial__btn customer-testimonial__btn--secondary" @click="cancelEdit">
            Cancelar
          </button>
          <button
            class="customer-testimonial__btn"
            :disabled="!quoteInput.trim()"
            @click="save"
          >
            Salvar alterações
          </button>
        </div>
      </div>

      <!-- View mode -->
      <div v-else class="customer-testimonial__view">
        <div v-if="testimonial.authorPhoto" class="customer-testimonial__view-header">
          <img
            :src="testimonial.authorPhoto"
            alt="Foto do depoimento"
            class="customer-testimonial__view-photo"
          />
        </div>

        <p class="customer-testimonial__quote">{{ testimonial.quote }}</p>

        <div class="customer-testimonial__meta">
          <label class="customer-testimonial__toggle">
            <input
              type="checkbox"
              :checked="testimonial.allowPublic"
              @change="updateAllowPublic(($event.target as HTMLInputElement).checked)"
            />
            <span>Autorizado para uso no site</span>
          </label>

          <span class="customer-testimonial__status" :class="statusClass">
            {{ statusLabel }}
          </span>
        </div>

        <button class="customer-testimonial__btn customer-testimonial__btn--secondary" @click="startEdit">
          Editar
        </button>
      </div>
    </template>
  </div>
</template>
