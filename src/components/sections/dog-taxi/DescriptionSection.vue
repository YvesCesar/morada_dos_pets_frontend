<script setup lang="ts">
import mapIllustration from '@/assets/images/dog-taxi/map-illustration.svg'
</script>

<template>
  <section class="dog-taxi-description">
    <div class="dog-taxi-description__container">
      <h2 class="dog-taxi-description__title">Precisa de ajuda com a locomoção do seu cão?</h2>
      <p class="dog-taxi-description__text">
        Com o Dog Táxi, você pode proporcionar ao seu cão uma viagem tranquila e livre de
        preocupações
      </p>

      <div class="dog-taxi-description__content">
        <div class="dog-taxi-description__map">
          <img
            :src="mapIllustration"
            alt="Mapa de rotas do Dog Táxi"
            class="dog-taxi-description__map-image"
          />
        </div>

        <div class="dog-taxi-description__card">
          <h3 class="dog-taxi-description__card-title">Agende uma viagem</h3>

          <p class="dog-taxi-description__card-note">
            Consulte as condições para obter informações sobre o preço
          </p>

          <div class="dog-taxi-description__form">
            <div class="dog-taxi-description__form-row">
              <div class="dog-taxi-description__connector">
                <span class="dog-taxi-description__connector-dot"></span>
                <span class="dog-taxi-description__connector-line"></span>
                <span class="dog-taxi-description__connector-dot"></span>
              </div>

              <div class="dog-taxi-description__fields">
                <div class="dog-taxi-description__input-group">
                  <label class="dog-taxi-description__label">Informe o local de partida</label>
                  <input
                    type="text"
                    class="dog-taxi-description__input"
                    placeholder="Ex: Av. Flores, n° 86, São Bernardo - AM"
                  />
                </div>

                <div class="dog-taxi-description__input-group">
                  <label class="dog-taxi-description__label">Selecione a unidade de destino</label>
                  <select class="dog-taxi-description__select">
                    <option value="" disabled selected>Selecione uma unidade</option>
                    <option value="horizonte">Rua Holanda, n° 125, Horizonte - AM</option>
                    <option value="sao-bernardo">Av. Flores, n° 86, São Bernardo - AM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="dog-taxi-description__button-wrapper">
            <button class="dog-taxi-description__button">Simular agora</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dog-taxi-description {
  padding: 100px var(--container-padding) 60px;
  background-color: var(--color-white);
}

.dog-taxi-description__container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.dog-taxi-description__title {
  font-size: 32px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
  margin-bottom: 40px;
}

.dog-taxi-description__text {
  font-size: 24px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  margin-bottom: 50px;
}

.dog-taxi-description__content {
  display: flex;
  gap: 88px;
  align-items: center;
}

.dog-taxi-description__map {
  flex: 1;
  max-width: 669px;
  height: 529px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.15);
}

.dog-taxi-description__map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dog-taxi-description__card {
  flex-shrink: 0;
  width: 413px;
}

.dog-taxi-description__card-title {
  font-size: 24px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25em;
  margin-bottom: 12px;
}

.dog-taxi-description__card-note {
  font-size: 14px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 0.93em;
  margin-bottom: 30px;
}

.dog-taxi-description__form {
  margin-bottom: 20px;
}

.dog-taxi-description__form-row {
  display: flex;
  gap: 12px;
}

.dog-taxi-description__connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 28px;
  width: 11px;
  flex-shrink: 0;
}

.dog-taxi-description__connector-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: var(--color-primary);
  flex-shrink: 0;
}

.dog-taxi-description__connector-line {
  flex: 1;
  width: 3px;
  border-left: 3px dashed rgba(41, 16, 0, 0.3);
  min-height: 67px;
}

.dog-taxi-description__fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dog-taxi-description__input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dog-taxi-description__label {
  font-size: 14px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
}

.dog-taxi-description__input,
.dog-taxi-description__select {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  color: var(--color-text);
  background-color: var(--color-white);
  transition: border-color var(--transition-fast);
}

.dog-taxi-description__input:focus,
.dog-taxi-description__select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(41, 16, 0, 0.1);
}

.dog-taxi-description__input::placeholder {
  color: var(--color-text-muted);
}

.dog-taxi-description__button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.dog-taxi-description__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: var(--font-semibold);
  font-family: inherit;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.dog-taxi-description__button:hover {
  background-color: #3d2000;
}

/* Responsive */
@media (max-width: 1200px) {
  .dog-taxi-description__content {
    gap: 40px;
  }

  .dog-taxi-description__map {
    max-width: 550px;
    height: 450px;
  }

  .dog-taxi-description__card {
    width: 380px;
  }
}

@media (max-width: 992px) {
  .dog-taxi-description {
    padding: 80px var(--container-padding) 50px;
  }

  .dog-taxi-description__title {
    font-size: 28px;
  }

  .dog-taxi-description__text {
    font-size: 20px;
  }

  .dog-taxi-description__content {
    flex-direction: column;
    align-items: center;
  }

  .dog-taxi-description__map {
    max-width: 100%;
    width: 100%;
    height: 400px;
  }

  .dog-taxi-description__card {
    width: 100%;
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  .dog-taxi-description {
    padding: 60px var(--container-padding) 40px;
  }

  .dog-taxi-description__title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .dog-taxi-description__text {
    font-size: 18px;
    margin-bottom: 40px;
  }

  .dog-taxi-description__map {
    height: 350px;
  }

  .dog-taxi-description__card-title {
    font-size: 22px;
  }

  .dog-taxi-description__input,
  .dog-taxi-description__select {
    font-size: 14px;
    padding: 10px 12px;
  }

  .dog-taxi-description__label {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .dog-taxi-description {
    padding: 50px var(--container-padding) 30px;
  }

  .dog-taxi-description__title {
    font-size: 22px;
  }

  .dog-taxi-description__text {
    font-size: 16px;
  }

  .dog-taxi-description__map {
    height: 300px;
  }

  .dog-taxi-description__card-title {
    font-size: 20px;
  }

  .dog-taxi-description__card-note {
    font-size: 12px;
  }

  .dog-taxi-description__input,
  .dog-taxi-description__select {
    font-size: 13px;
    padding: 8px 10px;
  }

  .dog-taxi-description__label {
    font-size: 12px;
  }

  .dog-taxi-description__button {
    width: 100%;
    font-size: 16px;
  }

  .dog-taxi-description__button-wrapper {
    justify-content: center;
  }
}
</style>
