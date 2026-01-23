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

<style scoped>
.about {
  padding: 4rem 0;
}

.about__container {
  display: grid;
  grid-template-columns: 590px 1fr;
  gap: 2rem;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.about__video {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 590 / 330;
  cursor: pointer;
}

.about__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about__play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 116px;
  height: 116px;
  transition: transform var(--transition-fast);
}

.about__play-btn:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.about__play-btn img {
  width: 100%;
  height: 100%;
}

.about__content {
  padding-left: 2rem;
}

.about__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
  margin-bottom: 1.5rem;
}

.about__text {
  font-size: var(--text-xl);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25;
  max-width: 548px;
}

/* Responsive */
@media (max-width: 1200px) {
  .about__container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 992px) {
  .about__container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .about__video {
    max-width: 600px;
    margin: 0 auto;
  }

  .about__content {
    padding-left: 0;
    text-align: center;
  }

  .about__text {
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 3rem 0;
  }

  .about__title {
    font-size: var(--text-xl);
  }

  .about__text {
    font-size: var(--text-base);
  }

  .about__play-btn {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .about__play-btn {
    width: 60px;
    height: 60px;
  }
}
</style>
