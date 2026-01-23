<script setup lang="ts">
import historiaPets from '@/assets/images/historia-pets.png'
</script>

<template>
  <section class="history">
    <div class="history__container">
      <!-- Content -->
      <div class="history__content">
        <h2 class="history__title">Nossa história</h2>
        <div class="history__text">
          <p>
            A Morada dos Pets nasceu em 2017 por dois apaixonados por pets que notaram a ausência
            de serviços como hospedagem para cães na cidade de Manaus.
          </p>
          <p>
            Foi isso que nos inspirou a criar um hotel que oferecesse uma experiência positiva
            para os cãeszinhos, com muito carinho, companhia, entretenimento, além de colaborar
            com o seu desenvolvimento sensorial através de atividades. Criando assim, uma
            alternativa para auxiliar os tutores, que possuem rotinas corridas, a oferecer mais
            atenção aos seus filhos caninos.
          </p>
          <p>
            Com duas unidades em Manaus (AM) a equipe Morada dos Pets é composta por 25
            funcionários, todos compartilhando a mesma paixão pelos animais. Hoje, somos um dos
            principais hotéis de pets da região, cada vez mais buscamos expandir e aprimorar
            nossos serviços para continuar proporcionando confiança de que seus filhotes estarão
            em boas mãos e passarão dias incríveis por aqui!
          </p>
          <p>Aos novos visitantes, esperamos vê-lo em breve na Morada dos Pets</p>
        </div>
      </div>
    </div>

    <!-- Image - fora do container para ir até a borda -->
    <div class="history__image-wrapper">
      <img :src="historiaPets" alt="Equipe Morada dos Pets" class="history__image" />
    </div>
  </section>
</template>

<style scoped>
.history {
  position: relative;
  padding: 8rem 0 4rem;
  overflow: hidden;
}

.history__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.history__content {
  padding-right: 2rem;
}

.history__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  margin-bottom: 2rem;
}

.history__text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.history__text p {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25;
}

.history__image-wrapper {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 45%;
  max-width: 655px;
  height: 459px;
}

.history__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

/* Responsive */
@media (max-width: 1200px) {
  .history__container {
    gap: 2rem;
  }

  .history__content {
    padding-right: 0;
  }

  .history__image-wrapper {
    width: 48%;
  }
}

@media (max-width: 992px) {
  .history {
    padding: 4rem 0;
  }

  .history__container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .history__image-wrapper {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    width: 100%;
    max-width: 100%;
    height: 350px;
    order: -1;
    margin-bottom: 2rem;
  }

  .history__image {
    border-radius: 0;
  }

  .history__content {
    text-align: center;
    padding: 0 var(--container-padding);
  }
}

@media (max-width: 768px) {
  .history {
    padding: 3rem 0;
  }

  .history__title {
    font-size: var(--text-xl);
  }

  .history__text p {
    font-size: 1rem;
  }

  .history__image-wrapper {
    height: 280px;
  }
}

@media (max-width: 480px) {
  .history__text {
    gap: 1rem;
  }

  .history__image-wrapper {
    height: 220px;
  }
}
</style>
