<script setup lang="ts">
import { ref } from 'vue'
import videoSource from '@/assets/images/morada_dos_pets_presentation.mp4'
import playButton from '@/assets/images/play-button.svg'

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)

const togglePlay = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause()
    } else {
      videoRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const onVideoEnded = () => {
  isPlaying.value = false
}
</script>

<template>
  <section id="quem-somos" class="about">
    <div class="about__container">
      <!-- Video Area -->
      <div class="about__video">
        <video
          ref="videoRef"
          class="about__media"
          :src="videoSource"
          @ended="onVideoEnded"
          @click="togglePlay"
        ></video>
        <button
          v-show="!isPlaying"
          class="about__play-btn"
          aria-label="Reproduzir vídeo"
          @click="togglePlay"
        >
          <img :src="playButton" alt="" />
        </button>
      </div>

      <!-- Content -->
      <div class="about__content">
        <h2 class="about__title">
          Com a Morada dos Pets, seu<br />
          melhor amigo sente-se em casa
        </h2>
        <p class="about__text">
          Contamos com ambiente amplamente personalizado, para proporcionar experiências positivas
          aos nossos clientes.
        </p>
      </div>
    </div>
  </section>
</template>
