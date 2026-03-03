<script setup lang="ts">
import ContactBanner from '@/components/sections/contato/ContactBanner.vue'
import ContactFormSection from '@/components/sections/contato/ContactFormSection.vue'
import ContactInfoSection from '@/components/sections/contato/ContactInfoSection.vue'
</script>

<template>
  <div class="contato-view">
    <main>
      <ContactBanner />
      <ContactFormSection />
      <ContactInfoSection />
    </main>
  </div>
</template>
