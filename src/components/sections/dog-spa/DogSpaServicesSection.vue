<script setup lang="ts">
import { useRouter } from 'vue-router'
import { dogSpaServices } from '@/data'

const router = useRouter()

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

<style scoped>
.dog-spa-services {
  padding: 0 var(--container-padding) 100px;
  background-color: var(--color-white);
}

.dog-spa-services__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.dog-spa-services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.dog-spa-services__card {
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dog-spa-services__card-image {
  width: 100%;
  height: 227px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.dog-spa-services__card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 20px 26px 30px;
  flex: 1;
}

.dog-spa-services__card-info {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 24px;
  flex: 1;
}

.dog-spa-services__card-header {
  display: flex;
  flex-direction: column;
  gap: 23px;
}

.dog-spa-services__card-title-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dog-spa-services__card-title {
  font-size: 22px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
}

.dog-spa-services__card-description {
  font-size: 18px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  min-height: 46px;
}

.dog-spa-services__card-divider {
  width: 100%;
  height: 3px;
  background-color: #705f54;
}

.dog-spa-services__prices {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.dog-spa-services__prices-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dog-spa-services__price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.dog-spa-services__price-size {
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dog-spa-services__price-value {
  font-size: 18px;
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.25em;
  text-align: right;
}

.dog-spa-services__additionals {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dog-spa-services__additionals-label {
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
}

.dog-spa-services__additionals-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dog-spa-services__additional-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.dog-spa-services__additional-name {
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dog-spa-services__bullet {
  font-size: 18px;
  color: var(--color-text);
}

.dog-spa-services__additional-price {
  font-size: 18px;
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: 1.25em;
  text-align: right;
}

.dog-spa-services__additional-description {
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
}

.dog-spa-services__btn {
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: var(--font-semibold);
  line-height: 1.25em;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.dog-spa-services__btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1200px) {
  .dog-spa-services__grid {
    gap: 24px;
  }

  .dog-spa-services__card-image {
    height: 200px;
  }
}

@media (max-width: 992px) {
  .dog-spa-services {
    padding: 0 var(--container-padding) 80px;
  }

  .dog-spa-services__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .dog-spa-services__card-image {
    height: 180px;
  }

  .dog-spa-services__card-title {
    font-size: 20px;
  }

  .dog-spa-services__card-description {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .dog-spa-services {
    padding: 0 var(--container-padding) 60px;
  }

  .dog-spa-services__grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }

  .dog-spa-services__card-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .dog-spa-services {
    padding: 0 var(--container-padding) 50px;
  }

  .dog-spa-services__card-content {
    padding: 16px 20px 24px;
    gap: 30px;
  }

  .dog-spa-services__card-title {
    font-size: 18px;
  }

  .dog-spa-services__card-description {
    font-size: 14px;
  }

  .dog-spa-services__price-size,
  .dog-spa-services__additional-name,
  .dog-spa-services__additionals-label,
  .dog-spa-services__additional-description {
    font-size: 14px;
  }

  .dog-spa-services__price-value,
  .dog-spa-services__additional-price {
    font-size: 16px;
  }

  .dog-spa-services__btn {
    font-size: 16px;
  }
}
</style>
