<script setup lang="ts">
import { crechePlans } from '@/data'
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

            <button class="creche-pricing__btn">Solicitar</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.creche-pricing {
  padding: 35px var(--container-padding) 100px;
  background-color: var(--color-white);
}

.creche-pricing__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.creche-pricing__grid {
  display: grid;
  grid-template-columns: repeat(2, 404px);
  gap: 20px;
  justify-content: center;
}

.creche-pricing__card {
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 404px;
}

.creche-pricing__card-image {
  width: 100%;
  height: 227px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.creche-pricing__card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 20px 26px 30px;
  flex: 1;
}

.creche-pricing__card-info {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 24px;
  flex: 1;
}

.creche-pricing__card-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.creche-pricing__card-title {
  font-size: 22px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
}

.creche-pricing__card-schedule {
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
}

.creche-pricing__card-divider {
  width: 100%;
  height: 3px;
  background-color: #705f54;
}

.creche-pricing__prices {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.creche-pricing__prices-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.creche-pricing__price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.creche-pricing__price-frequency {
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.creche-pricing__bullet {
  color: var(--color-text);
}

.creche-pricing__price-value {
  font-size: 18px;
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.25em;
  text-align: right;
}

.creche-pricing__btn {
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

.creche-pricing__btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 992px) {
  .creche-pricing__grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 828px;
  }

  .creche-pricing__card {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .creche-pricing {
    padding: 0 var(--container-padding) 60px;
  }

  .creche-pricing__grid {
    grid-template-columns: 1fr;
    max-width: 404px;
  }

  .creche-pricing__card-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .creche-pricing {
    padding: 0 var(--container-padding) 40px;
  }

  .creche-pricing__card-title {
    font-size: 20px;
  }

  .creche-pricing__card-schedule,
  .creche-pricing__price-frequency {
    font-size: 14px;
  }

  .creche-pricing__price-value {
    font-size: 16px;
  }

  .creche-pricing__card-image {
    height: 180px;
  }

  .creche-pricing__btn {
    font-size: 16px;
    width: 100%;
  }
}
</style>
