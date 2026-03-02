import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DashboardTestimonial, Testimonial } from '@/types'
import { mockTestimonials } from '@/data'
import defaultPhoto from '@/assets/images/testemunho-cliente.png'

export const useTestimonialsStore = defineStore('testimonials', () => {
  const testimonials = ref<DashboardTestimonial[]>([...mockTestimonials])

  function getByUser(userId: string) {
    return testimonials.value.find((t) => t.userId === userId)
  }

  function submitTestimonial(
    userId: string,
    authorName: string,
    authorPhoto: string,
    quote: string,
    allowPublic: boolean,
  ) {
    const existing = testimonials.value.find((t) => t.userId === userId)
    if (existing) {
      Object.assign(existing, { quote, allowPublic, authorName, authorPhoto })
      if (!allowPublic) existing.approved = false
    } else {
      testimonials.value.push({
        id: 't' + Date.now(),
        userId,
        authorName,
        authorPhoto,
        quote,
        allowPublic,
        approved: false,
        createdAt: new Date().toISOString().split('T')[0] ?? '',
      })
    }
  }

  function toggleApproved(id: string) {
    const t = testimonials.value.find((t) => t.id === id)
    if (t && t.allowPublic) t.approved = !t.approved
  }

  const publicCarouselItems = computed<Testimonial[]>(() =>
    testimonials.value
      .filter((t) => t.allowPublic && t.approved)
      .map((t, i) => ({
        id: i + 1,
        image: t.authorPhoto || defaultPhoto,
        quote: t.quote,
        author: t.authorName,
      })),
  )

  return { testimonials, getByUser, submitTestimonial, toggleApproved, publicCarouselItems }
})
