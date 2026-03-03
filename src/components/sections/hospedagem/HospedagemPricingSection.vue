<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { hospedagemPlans as staticHospedagemPlans } from '@/data'
import { usePricesStore } from '@/stores/prices'

const router = useRouter()
const pricesStore = usePricesStore()

const hospedagemPlans = computed(() =>
  pricesStore.hospedagemPlans.length > 0 ? pricesStore.hospedagemPlans : staticHospedagemPlans,
)

const handleSolicitar = (planId: string) => {
  router.push({ name: 'pagamento', query: { tipo: 'hospedagem', plano: planId } })
}
</script>

<template>
  <section class="hospedagem-pricing">
    <div class="hospedagem-pricing__container">
      <div class="hospedagem-pricing__grid">
        <article
          v-for="plan in hospedagemPlans"
          :key="plan.id"
          class="hospedagem-pricing__card"
        >
          <img :src="plan.image" :alt="plan.title" class="hospedagem-pricing__card-image" />

          <div class="hospedagem-pricing__card-content">
            <div class="hospedagem-pricing__card-info">
              <div class="hospedagem-pricing__card-header">
                <h3 class="hospedagem-pricing__card-title">{{ plan.title }}</h3>
                <div class="hospedagem-pricing__card-divider"></div>
              </div>

              <div class="hospedagem-pricing__prices">
                <div class="hospedagem-pricing__prices-list">
                  <div
                    v-for="price in plan.prices"
                    :key="price.size"
                    class="hospedagem-pricing__price-row"
                  >
                    <span class="hospedagem-pricing__price-size">
                      <span class="hospedagem-pricing__bullet">•</span>
                      {{ price.size }}
                    </span>
                    <span class="hospedagem-pricing__price-value">{{ price.price }}</span>
                  </div>
                </div>
              </div>
            </div>

            <button class="hospedagem-pricing__btn" @click="handleSolicitar(plan.id)">Solicitar</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
