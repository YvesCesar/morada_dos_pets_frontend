<script setup lang="ts">
import iconEquipe from '@/assets/images/icon-equipe.svg'
import iconSeguranca from '@/assets/images/icon-seguranca.svg'
import iconAmbiente from '@/assets/images/icon-pata.svg'
import iconAtividades from '@/assets/images/icon-atividades.svg'

const features = [
  {
    icon: iconEquipe,
    title: 'Equipe especializada',
    alt: 'Ícone de funcionário'
  },
  {
    icon: iconSeguranca,
    title: 'Segurança\n24 horas',
    alt: 'Ícone de câmera'
  },
  {
    icon: iconAmbiente,
    title: 'Ambientes\npersonalizados',
    alt: 'Ícone de pata'
  },
  {
    icon: iconAtividades,
    title: 'Atividades diversificadas',
    alt: 'Ícone de atividades'
  }
]
</script>

<template>
  <section class="features">
    <div class="features__container">
      <div v-for="(feature, index) in features" :key="feature.title" class="features__item">
        <div class="features__icon">
          <img :src="feature.icon" :alt="feature.alt" />
        </div>
        <p class="features__title" v-html="feature.title.replace('\n', '<br>')"></p>
        <div v-if="index < features.length - 1" class="features__separator"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  background: var(--color-secondary);
  padding: 5.5rem 0;
}

.features__container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.features__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;
  position: relative;
  padding: 0 3rem;
}

.features__icon {
  width: 86px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.features__icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.features__title {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text);
  text-align: center;
  line-height: 1.25;
}

.features__separator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 148px;
  background: var(--color-primary);
}

/* Responsive */
@media (max-width: 1200px) {
  .features__item {
    padding: 0 2rem;
  }
}

@media (max-width: 992px) {
  .features__container {
    flex-wrap: wrap;
    gap: 2rem;
  }

  .features__item {
    flex: 0 0 calc(50% - 1rem);
    padding: 1.5rem;
  }

  .features__separator {
    display: none;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 3rem 0;
  }

  .features__icon {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .features__item {
    flex: 0 0 100%;
    padding: 1rem;
  }

  .features__icon {
    width: 60px;
    height: 60px;
  }
}
</style>
