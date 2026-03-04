<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { dogSpaServices as staticDogSpaServices } from '@/data'
import { usePricesStore } from '@/stores/prices'

const router = useRouter()
const pricesStore = usePricesStore()

const dogSpaServices = computed(() =>
  pricesStore.dogSpaServices.length > 0 ? pricesStore.dogSpaServices : staticDogSpaServices,
)

const handleSolicitar = (serviceId: string) => {
  router.push({ name: 'pagamento', query: { tipo: 'dog-spa', servico: serviceId } })
}
</script>

<template>
  <section class="dog-spa-services">
    <div class="dog-spa-services__container">
      <div class="dog-spa-services__grid">
        <article
          v-for="service in dogSpaServices"
          :key="service.id"
          class="dog-spa-services__card"
        >
          <img :src="service.image" :alt="service.title" class="dog-spa-services__card-image" />

          <div class="dog-spa-services__card-content">
            <div class="dog-spa-services__card-info">
              <div class="dog-spa-services__card-header">
                <div class="dog-spa-services__card-title-group">
                  <h3 class="dog-spa-services__card-title">{{ service.title }}</h3>
                  <p class="dog-spa-services__card-description">{{ service.description }}</p>
                </div>
                <div class="dog-spa-services__card-divider"></div>
              </div>

              <div class="dog-spa-services__prices">
                <div class="dog-spa-services__prices-list">
                  <div
                    v-for="price in service.prices"
                    :key="price.size"
                    class="dog-spa-services__price-row"
                  >
                    <span class="dog-spa-services__price-size">
                      <span class="dog-spa-services__bullet">•</span>
                      {{ price.size }}
                    </span>
                    <span class="dog-spa-services__price-value">{{ price.price }}</span>
                  </div>
                </div>

                <div class="dog-spa-services__additionals">
                  <span class="dog-spa-services__additionals-label">Adicionais:</span>

                  <div class="dog-spa-services__additionals-list">
                    <template v-for="additional in service.additionals" :key="additional.name">
                      <div v-if="additional.price" class="dog-spa-services__additional-row">
                        <span class="dog-spa-services__additional-name">
                          <span class="dog-spa-services__bullet">•</span>
                          {{ additional.name }}
                        </span>
                        <span class="dog-spa-services__additional-price">{{ additional.price }}</span>
                      </div>
                      <p v-else-if="additional.description" class="dog-spa-services__additional-description">
                        {{ additional.description }}
                      </p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <button class="dog-spa-services__btn" @click="handleSolicitar(service.id)">Solicitar</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
