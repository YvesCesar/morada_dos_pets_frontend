import { ref, computed } from 'vue'
import { usePhotoUpload } from './usePhotoUpload'
import { useAuthStore } from '@/stores/auth'
import { useTestimonialsStore } from '@/stores/testimonials'

/**
 * Composable para edição de depoimento do cliente
 */
export function useCustomerTestimonial() {
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

  return {
    testimonial,
    isEditing,
    quoteInput,
    allowPublicInput,
    photoInput,
    fileInputRef,
    statusLabel,
    statusClass,
    handlePhotoChange,
    startEdit,
    cancelEdit,
    save,
    updateAllowPublic,
  }
}
