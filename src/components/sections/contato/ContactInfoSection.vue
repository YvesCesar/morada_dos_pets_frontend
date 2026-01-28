<script setup lang="ts">
import { corporativeContacts, unitContacts } from '@/data/contact'
</script>

<template>
  <section class="contact-info">
    <div class="contact-info__container">
      <h2 class="contact-info__heading">Contatos corporativos</h2>
      <div class="contact-info__grid">
        <!-- Corporative Card -->
        <div class="contact-info__card">
          <h3 class="contact-info__card-title">{{ corporativeContacts.title }}</h3>
          <div class="contact-info__card-items">
            <div
              v-for="item in corporativeContacts.items"
              :key="item.text"
              class="contact-info__item"
            >
              <img :src="item.icon" :alt="item.text" class="contact-info__item-icon" />
              <a v-if="item.link" :href="item.link" class="contact-info__item-link">
                {{ item.text }}
              </a>
              <span v-else class="contact-info__item-text">{{ item.text }}</span>
            </div>
          </div>
        </div>

        <!-- Unit Cards -->
        <div v-for="card in unitContacts" :key="card.title" class="contact-info__card">
          <h3 class="contact-info__card-title">{{ card.title }}</h3>
          <div class="contact-info__card-items">
            <div v-for="item in card.items" :key="item.text" class="contact-info__item">
              <img :src="item.icon" :alt="item.text" class="contact-info__item-icon" />
              <a v-if="item.link" :href="item.link" class="contact-info__item-link">
                {{ item.text }}
              </a>
              <span v-else class="contact-info__item-text">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-info {
  padding: 4rem 0 8rem;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.contact-info__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.contact-info__heading {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  margin-bottom: 2rem;
  text-align: center;
}

.contact-info__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.contact-info__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 2rem;
}

.contact-info__card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.contact-info__card-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-info__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-info__item-icon {
  width: 32px;
  height: 32px;
}

.contact-info__item-link,
.contact-info__item-text {
  font-size: var(--text-base);
  color: var(--color-white);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.contact-info__item-link:hover {
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 1200px) {
  .contact-info__grid {
    gap: 1rem;
  }
}

@media (max-width: 992px) {
  .contact-info {
    padding: 4rem 0;
  }

  .contact-info__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-info__card {
    padding: 1.5rem;
    align-items: center;
    text-align: center;
  }

  .contact-info__card-title {
    margin-bottom: 1rem;
    min-height: auto;
    text-align: center;
    width: 100%;
    align-self: center;
  }

  .contact-info__heading {
    text-align: center;
  }

  .contact-info__item {
    justify-content: center;
  }
}
</style>
