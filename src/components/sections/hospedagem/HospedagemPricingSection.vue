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

<style scoped>
.hospedagem-pricing {
  padding: 0 var(--container-padding) 100px;
  background-color: var(--color-white);
}

.hospedagem-pricing__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.hospedagem-pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.hospedagem-pricing__card {
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hospedagem-pricing__card-image {
  width: 100%;
  height: 227px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.hospedagem-pricing__card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 20px 26px 30px;
  flex: 1;
}

.hospedagem-pricing__card-info {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 24px;
  flex: 1;
}

.hospedagem-pricing__card-header {
  display: flex;
  flex-direction: column;
  gap: 23px;
}

.hospedagem-pricing__card-title {
  font-size: 22px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
}

.hospedagem-pricing__card-divider {
  width: 100%;
  height: 3px;
  background-color: #705f54;
}

.hospedagem-pricing__prices {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.hospedagem-pricing__prices-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hospedagem-pricing__price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.hospedagem-pricing__price-size {
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hospedagem-pricing__bullet {
  color: var(--color-text);
}

.hospedagem-pricing__price-value {
  font-size: 18px;
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.25em;
  text-align: right;
}

.hospedagem-pricing__btn {
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  font-weight: var(--font-semibold);
  line-height: 1.25em;
  color: var(--color-white);
  background: var(--color-primary);
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.hospedagem-pricing__btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1200px) {
  .hospedagem-pricing__grid {
    gap: 24px;
  }

  .hospedagem-pricing__card-image {
    height: 200px;
  }
}

@media (max-width: 992px) {
  .hospedagem-pricing {
    padding: 0 var(--container-padding) 80px;
  }

  .hospedagem-pricing__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .hospedagem-pricing {
    padding: 0 var(--container-padding) 60px;
  }

  .hospedagem-pricing__grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }

  .hospedagem-pricing__card-content {
    padding: 16px 20px 24px;
    gap: 30px;
  }

  .hospedagem-pricing__card-title {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .hospedagem-pricing {
    padding: 0 var(--container-padding) 50px;
  }

  .hospedagem-pricing__card-image {
    height: 180px;
  }

  .hospedagem-pricing__card-content {
    padding: 14px 16px 20px;
    gap: 24px;
  }

  .hospedagem-pricing__card-title {
    font-size: 18px;
  }

  .hospedagem-pricing__price-size {
    font-size: 14px;
  }

  .hospedagem-pricing__price-value {
    font-size: 16px;
  }

  .hospedagem-pricing__btn {
    font-size: 16px;
    padding: 6px 20px;
  }
}
</style>
