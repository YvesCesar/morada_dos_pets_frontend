<script setup lang="ts">
import { dogSpaBenefits } from '@/data'
</script>

<template>
  <section class="dog-spa-benefits">
    <div class="dog-spa-benefits__container">
      <h2 class="dog-spa-benefits__title">Benefícios por escolher a Morada dos Pets</h2>

      <div class="dog-spa-benefits__grid">
        <article
          v-for="benefit in dogSpaBenefits"
          :key="benefit.title"
          class="dog-spa-benefits__card"
        >
          <img :src="benefit.icon" :alt="benefit.title" class="dog-spa-benefits__card-icon" />
          <div class="dog-spa-benefits__card-content">
            <h3 class="dog-spa-benefits__card-title">{{ benefit.title }}</h3>
            <p class="dog-spa-benefits__card-description">{{ benefit.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dog-spa-benefits {
  padding: 80px var(--container-padding) 100px;
  background-color: var(--color-secondary);
}

.dog-spa-benefits__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.dog-spa-benefits__title {
  font-size: 32px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
  margin-bottom: 60px;
  text-align: center;
}

.dog-spa-benefits__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.dog-spa-benefits__card {
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 30px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.dog-spa-benefits__card-icon {
  width: 148px;
  height: 148px;
  object-fit: contain;
}

.dog-spa-benefits__card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.dog-spa-benefits__card-title {
  font-size: 24px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
}

.dog-spa-benefits__card-description {
  font-size: 18px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
}

/* Responsive */
@media (max-width: 1200px) {
  .dog-spa-benefits__grid {
    gap: 30px;
  }

  .dog-spa-benefits__card-icon {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 992px) {
  .dog-spa-benefits {
    padding: 60px var(--container-padding) 80px;
  }

  .dog-spa-benefits__title {
    font-size: 28px;
    margin-bottom: 50px;
  }

  .dog-spa-benefits__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .dog-spa-benefits__card {
    padding: 24px 16px 32px;
  }

  .dog-spa-benefits__card-title {
    font-size: 22px;
  }

  .dog-spa-benefits__card-description {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .dog-spa-benefits {
    padding: 50px var(--container-padding) 60px;
  }

  .dog-spa-benefits__title {
    font-size: 24px;
    margin-bottom: 40px;
  }

  .dog-spa-benefits__grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }

  .dog-spa-benefits__card-icon {
    width: 100px;
    height: 100px;
  }

  .dog-spa-benefits__card-content {
    gap: 20px;
  }

  .dog-spa-benefits__card-title {
    font-size: 20px;
  }

  .dog-spa-benefits__card-description {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .dog-spa-benefits {
    padding: 40px var(--container-padding) 50px;
  }

  .dog-spa-benefits__title {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .dog-spa-benefits__card {
    padding: 20px 16px 28px;
  }

  .dog-spa-benefits__card-icon {
    width: 80px;
    height: 80px;
  }

  .dog-spa-benefits__card-content {
    gap: 16px;
  }

  .dog-spa-benefits__card-title {
    font-size: 18px;
  }

  .dog-spa-benefits__card-description {
    font-size: 14px;
  }
}
</style>
