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

<style scoped>
.customer-testimonial {
  background: var(--color-white);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px;
}

.customer-testimonial__title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: 16px;
}

.customer-testimonial__hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.customer-testimonial__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Photo upload */
.customer-testimonial__photo-field {
  display: flex;
  align-items: center;
  gap: 14px;
}

.customer-testimonial__photo-preview {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.05);
  border: 2px dashed rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.customer-testimonial__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.customer-testimonial__photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}

.customer-testimonial__photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.customer-testimonial__photo-preview:hover .customer-testimonial__photo-overlay {
  opacity: 1;
}

.customer-testimonial__file-input {
  display: none;
}

.customer-testimonial__photo-hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* View mode photo */
.customer-testimonial__view-header {
  margin-bottom: 4px;
}

.customer-testimonial__view-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(0, 0, 0, 0.08);
}

.customer-testimonial__textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  color: var(--color-text);
  resize: vertical;
  box-sizing: border-box;
  transition: border-color var(--transition-fast);
}

.customer-testimonial__textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.customer-testimonial__toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  color: var(--color-text);
  cursor: pointer;
}

.customer-testimonial__toggle input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.customer-testimonial__btn {
  align-self: flex-start;
  padding: 8px 20px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.customer-testimonial__btn:hover:not(:disabled) {
  opacity: 0.9;
}

.customer-testimonial__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.customer-testimonial__btn--secondary {
  background: rgba(0, 0, 0, 0.06);
  color: var(--color-text);
}

.customer-testimonial__actions {
  display: flex;
  gap: 8px;
}

.customer-testimonial__view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.customer-testimonial__quote {
  font-size: var(--text-xs);
  color: var(--color-text);
  line-height: 1.6;
  background: rgba(0, 0, 0, 0.02);
  border-left: 3px solid var(--color-primary);
  padding: 12px 16px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.customer-testimonial__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.customer-testimonial__status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: var(--radius-badge);
  font-size: var(--text-badge);
  font-weight: var(--font-medium);
}

.customer-testimonial__status--approved {
  background: var(--color-success-light);
  color: var(--color-success);
}

.customer-testimonial__status--pending {
  background: var(--color-warning-light);
  color: #854D0E;
}

.customer-testimonial__status--neutral {
  background: var(--color-neutral-light);
  color: var(--color-text-muted);
}
</style>
