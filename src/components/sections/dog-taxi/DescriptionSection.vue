<script setup lang="ts">
import { ref, computed } from 'vue'
import { units } from '@/data/units'

const selectedUnitId = ref<string>(units[0]?.id ?? '')

const selectedUnit = computed(() => units.find((unit) => unit.id === selectedUnitId.value))

const embedUrl = computed(() => {
  if (!selectedUnit.value) return ''
  const { lat, lng } = selectedUnit.value.coordinates
  return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr`
})
</script>

<template>
  <section class="dog-taxi-description">
    <div class="dog-taxi-description__container">
      <h2 class="dog-taxi-description__title">Precisa de ajuda com a locomoção do seu cão?</h2>
      <p class="dog-taxi-description__text">
        Com o Dog Táxi, você pode proporcionar ao seu cão uma viagem tranquila e livre de
        preocupações
      </p>

      <div class="dog-taxi-description__content">
        <div class="dog-taxi-description__map">
          <iframe
            v-if="embedUrl"
            :src="embedUrl"
            class="dog-taxi-description__map-iframe"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Mapa da unidade selecionada"
          ></iframe>
        </div>

        <div class="dog-taxi-description__card">
          <h3 class="dog-taxi-description__card-title">Agende uma viagem</h3>

          <p class="dog-taxi-description__card-note">
            Consulte as condições para obter informações sobre o preço
          </p>

          <div class="dog-taxi-description__form">
            <div class="dog-taxi-description__form-row">
              <div class="dog-taxi-description__connector">
                <span class="dog-taxi-description__connector-dot"></span>
                <span class="dog-taxi-description__connector-line"></span>
                <span class="dog-taxi-description__connector-dot"></span>
              </div>

              <div class="dog-taxi-description__fields">
                <div class="dog-taxi-description__input-group">
                  <label class="dog-taxi-description__label">Informe o local de partida</label>
                  <input
                    type="text"
                    class="dog-taxi-description__input"
                    placeholder="Ex: Av. Flores, n° 86, São Bernardo - AM"
                  />
                </div>

                <div class="dog-taxi-description__input-group">
                  <label class="dog-taxi-description__label">Selecione a unidade de destino</label>
                  <select v-model="selectedUnitId" class="dog-taxi-description__select">
                    <option value="" disabled>Selecione uma unidade</option>
                    <option v-for="unit in units" :key="unit.id" :value="unit.id">
                      {{ unit.address }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="dog-taxi-description__button-wrapper">
            <button class="dog-taxi-description__button">Simular agora</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
