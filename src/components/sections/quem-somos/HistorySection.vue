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
