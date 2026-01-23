<script setup lang="ts">
import footerWave from '@/assets/images/footer-wave.svg'
import socialIcons from '@/assets/images/social-icons.svg'
import logoPataSvg from '@/assets/images/logo-pata.svg'
import logoCasaSvg from '@/assets/images/logo-casa.svg'

const menuLinks = [
  { name: 'Home', href: '#inicio' },
  { name: 'Quem somos', href: '#quem-somos' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Contato', href: '#contato' }
]

const addresses = [
  'Rua Holanda, n° 125, Horizonte - AM',
  'Av. Flores, n° 86, São Bernardo - AM'
]
</script>

<template>
  <footer id="contato" class="footer">
    <img :src="footerWave" alt="" class="footer__wave" />

    <div class="footer__content">
      <div class="footer__container">
        <!-- Logo & Social -->
        <div class="footer__brand">
          <a href="#" class="footer__logo">
            <div class="footer__logo-icon">
              <img :src="logoPataSvg" alt="" class="logo-pata" />
              <img :src="logoCasaSvg" alt="" class="logo-casa" />
            </div>
            <span class="footer__logo-text">Morada dos Pets</span>
          </a>

          <div class="footer__social">
            <p class="footer__social-label">Siga nas redes sociais</p>
            <img :src="socialIcons" alt="Redes sociais" class="footer__social-icons" />
          </div>
        </div>

        <!-- Menu -->
        <nav class="footer__nav">
          <h3 class="footer__heading">Menu</h3>
          <ul class="footer__list">
            <li v-for="link in menuLinks" :key="link.name">
              <a :href="link.href" class="footer__link">{{ link.name }}</a>
            </li>
          </ul>
        </nav>

        <!-- Addresses -->
        <div class="footer__addresses">
          <h3 class="footer__heading">Endereços</h3>
          <ul class="footer__list">
            <li v-for="address in addresses" :key="address">
              <span class="footer__address">{{ address }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background: transparent;
}

.footer__wave {
  width: 100%;
  display: block;
}

.footer__content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.footer__container {
  display: grid;
  grid-template-columns: 343px 159px 298px;
  gap: 7.25rem;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 12.75rem;
}

/* Brand */
.footer__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9375rem;
}

.footer__logo {
  display: flex;
  align-items: center;
}

.footer__logo-icon {
  position: relative;
  width: 80px;
  height: 48px;
}

.footer__logo-icon img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.footer__logo-text {
  font-family: var(--font-logo);
  font-size: var(--text-xl);
  color: var(--color-primary);
  margin-left: 6px;
}

.footer__social {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6875rem;
}

.footer__social-label {
  font-size: var(--text-lg);
  font-weight: var(--font-regular);
  color: var(--color-text);
}

.footer__social-icons {
  height: 43px;
  width: auto;
}

/* Navigation & Addresses */
.footer__heading {
  font-size: 1.5625rem;
  font-weight: var(--font-medium);
  color: var(--color-black);
  margin-bottom: 1.5rem;
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__link,
.footer__address {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text);
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--color-primary-light);
}

.footer__address {
  color: var(--color-black);
}

/* Responsive */
@media (max-width: 1200px) {
  .footer__container {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
    padding: 0 5rem;
  }
}

@media (max-width: 992px) {
  .footer {
    background: var(--color-secondary);
    padding-top: 2rem;
  }

  .footer__wave {
    display: none;
  }

  .footer__content {
    position: relative;
  }

  .footer__container {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 0 var(--container-padding);
    padding-bottom: 3rem;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer__container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer__nav,
  .footer__addresses {
    align-items: center;
  }

  .footer__list {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .footer__logo-icon {
    width: 60px;
    height: 36px;
  }

  .footer__logo-text {
    font-size: var(--text-lg);
  }

  .footer__heading {
    font-size: var(--text-lg);
  }
}
</style>
