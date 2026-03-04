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
