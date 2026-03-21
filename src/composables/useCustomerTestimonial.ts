import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { testimonialSchema } from '@/schemas'
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
  const photoInput = ref('')
  const fileInputRef = ref<HTMLInputElement | null>(null)

  const { handleSubmit, errors, defineField, setValues, resetForm } = useForm({
    validationSchema: toTypedSchema(testimonialSchema),
    initialValues: {
      quote: '',
      allowPublic: false,
    },
  })

  const [quoteInput, quoteInputAttrs] = defineField('quote')
  const [allowPublicInput, allowPublicInputAttrs] = defineField('allowPublic')

  const charCount = computed(() => (quoteInput.value ?? '').length)

  const { handleFileChange: handlePhotoChange } = usePhotoUpload((url) => { photoInput.value = url })

  const startEdit = () => {
    setValues({
      quote: testimonial.value?.quote ?? '',
      allowPublic: testimonial.value?.allowPublic ?? false,
    })
    photoInput.value = testimonial.value?.authorPhoto ?? ''
    isEditing.value = true
  }

  const cancelEdit = () => {
    isEditing.value = false
    resetForm()
  }

  const save = handleSubmit((values) => {
    testimonialsStore.submitTestimonial(
      userId.value,
      authStore.user?.name ?? '',
      photoInput.value,
      values.quote.trim(),
      values.allowPublic,
    )
    isEditing.value = false
  })

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
    quoteInputAttrs,
    allowPublicInput,
    allowPublicInputAttrs,
    photoInput,
    fileInputRef,
    charCount,
    errors,
    statusLabel,
    statusClass,
    handlePhotoChange,
    startEdit,
    cancelEdit,
    save,
    updateAllowPublic,
  }
}
