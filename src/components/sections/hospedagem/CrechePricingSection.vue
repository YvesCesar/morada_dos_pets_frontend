<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { crechePlans as staticCrechePlans } from '@/data'
import { usePricesStore } from '@/stores/prices'

const router = useRouter()
const pricesStore = usePricesStore()

const crechePlans = computed(() =>
  pricesStore.crechePlans.length > 0 ? pricesStore.crechePlans : staticCrechePlans,
)

const handleSolicitar = (planId: string) => {
  router.push({ name: 'pagamento', query: { tipo: 'creche', plano: planId } })
}
</script>

<template>
  <section class="creche-pricing">
    <div class="creche-pricing__container">
      <div class="creche-pricing__grid">
        <article
          v-for="plan in crechePlans"
          :key="plan.id"
          class="creche-pricing__card"
        >
          <img :src="plan.image" :alt="plan.title" class="creche-pricing__card-image" />

          <div class="creche-pricing__card-content">
            <div class="creche-pricing__card-info">
              <div class="creche-pricing__card-header">
                <h3 class="creche-pricing__card-title">{{ plan.title }}</h3>
                <p class="creche-pricing__card-schedule">{{ plan.schedule }}</p>
                <div class="creche-pricing__card-divider"></div>
              </div>

              <div class="creche-pricing__prices">
                <div class="creche-pricing__prices-list">
                  <div
                    v-for="price in plan.prices"
                    :key="price.frequency"
                    class="creche-pricing__price-row"
                  >
                    <span class="creche-pricing__price-frequency">
                      <span class="creche-pricing__bullet">•</span>
                      {{ price.frequency }}
                    </span>
                    <span class="creche-pricing__price-value">{{ price.price }}</span>
                  </div>
                </div>
              </div>
            </div>

            <button class="creche-pricing__btn" @click="handleSolicitar(plan.id)">Solicitar</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
