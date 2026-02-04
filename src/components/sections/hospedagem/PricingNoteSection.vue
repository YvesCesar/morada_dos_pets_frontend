<script setup lang="ts">
</script>

<template>
  <section class="pricing-note">
    <div class="pricing-note__container">
      <p class="pricing-note__text">
        Os valores das diárias são flexíveis e se ajustam de acordo com o porte do animal.
      </p>
    </div>
  </section>
</template>

<style scoped>
.pricing-note {
  padding: 30px var(--container-padding) 35px;
  background-color: var(--color-white);
}

.pricing-note__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.pricing-note__text {
  font-size: 18px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  text-align: left;
  max-width: 1014px;
}

/* Responsive */
@media (max-width: 992px) {
  .pricing-note {
    padding: 24px var(--container-padding) 30px;
  }

  .pricing-note__text {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .pricing-note {
    padding: 20px var(--container-padding) 24px;
  }

  .pricing-note__text {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .pricing-note {
    padding: 16px var(--container-padding) 20px;
  }

  .pricing-note__text {
    font-size: 14px;
  }
}
</style>
