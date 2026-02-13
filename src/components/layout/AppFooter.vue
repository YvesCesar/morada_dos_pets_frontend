<script setup lang="ts">
import { RouterLink } from 'vue-router'
import footerWave from '@/assets/images/footer-wave.svg'
import logoPataSvg from '@/assets/images/logo-pata.svg'
import logoCasaSvg from '@/assets/images/logo-casa.svg'
import { footerMenuLinks, addresses, socialLinks } from '@/data'
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
            <div class="footer__social-icons">
              <!-- Instagram -->
              <a :href="socialLinks[0].url" target="_blank" rel="noopener noreferrer" :aria-label="socialLinks[0].name" class="footer__social-link">
                <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="21.5" cy="22.0729" rx="21.5" ry="20.9271" fill="#291000"/>
                  <rect x="9.5" y="9.64587" width="24" height="24" rx="6.5" fill="#291000" stroke="white" stroke-width="3"/>
                  <circle cx="21.5" cy="21.6461" r="5" fill="#291000" stroke="white" stroke-width="3"/>
                  <circle cx="28.5" cy="14.6459" r="1.5" fill="white"/>
                </svg>
              </a>
              <!-- Facebook -->
              <a :href="socialLinks[1].url" target="_blank" rel="noopener noreferrer" :aria-label="socialLinks[1].name" class="footer__social-link">
                <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M43 21.5539C43 9.65614 33.368 0 21.5 0C9.632 0 0 9.65614 0 21.5539C0 31.986 7.396 40.6722 17.2 42.6767V28.02H12.9V21.5539H17.2V16.1654C17.2 12.0055 20.5755 8.62155 24.725 8.62155H30.1V15.0877H25.8C24.6175 15.0877 23.65 16.0576 23.65 17.2431V21.5539H30.1V28.02H23.65V43C34.5075 41.9223 43 32.7403 43 21.5539Z" fill="#291000"/>
                </svg>
              </a>
              <!-- TikTok -->
              <a :href="socialLinks[2].url" target="_blank" rel="noopener noreferrer" :aria-label="socialLinks[2].name" class="footer__social-link">
                <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.442 0.0923576C12.723 0.789425 6.836 4.44275 3.258 10.1369C-1.815 18.1994 -0.866 28.857 5.542 35.8781C9.095 39.7666 13.529 42.0929 18.854 42.8488C19.845 42.9916 23.146 42.9832 24.187 42.8488C29.05 42.1769 33.4 40.0185 36.709 36.6424C37.801 35.5338 38.028 35.2734 38.75 34.316C40.9 31.4521 42.302 27.9584 42.848 24.1455C42.991 23.1545 42.991 19.8455 42.848 18.8545C42.487 16.3097 41.824 14.1429 40.774 12.0181C39.648 9.76736 38.506 8.16325 36.717 6.35759C33.4 2.99821 29.251 0.907005 24.481 0.201534C23.448 0.0503654 20.466 -0.0168228 19.442 0.0923576ZM26.077 9.63298C26.261 11.0691 26.715 12.1693 27.504 13.1267C28.529 14.3697 30.057 15.1676 31.72 15.3355L32.249 15.3943V17.3763V19.3584L31.46 19.308C31.023 19.2744 30.452 19.1988 30.192 19.1484C29.05 18.9133 27.588 18.2918 26.606 17.6283C26.345 17.4435 26.11 17.3008 26.085 17.3008C26.068 17.3008 26.051 19.5179 26.06 22.2306C26.077 27.1185 26.077 27.1773 25.883 27.9248C25.186 30.6627 23.087 32.7959 20.366 33.5181C19.358 33.7785 17.896 33.8205 16.88 33.6105C13.848 32.989 11.497 30.6711 10.875 27.7064C10.707 26.9338 10.716 25.4388 10.884 24.6242C11.027 23.9103 11.421 22.9193 11.858 22.197C12.228 21.584 13.252 20.4838 13.89 20.0302C15.352 18.9972 17.342 18.4345 18.98 18.6025L19.568 18.6613V20.7021V22.7429L19.257 22.659C19.081 22.6086 18.602 22.5918 18.182 22.6086C17.225 22.6506 16.502 22.9697 15.847 23.6416C13.756 25.7664 14.94 29.2937 17.905 29.7556C19.837 30.058 21.718 28.6386 22.003 26.665C22.054 26.3123 22.087 22.7597 22.087 17.6535V9.23825H24.053H26.026L26.077 9.63298Z" fill="#291000"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Menu -->
        <nav class="footer__nav">
          <h3 class="footer__heading">Menu</h3>
          <ul class="footer__list">
            <li v-for="link in footerMenuLinks" :key="link.name">
              <RouterLink
                v-if="link.isRoute"
                :to="link.to!"
                class="footer__link"
              >
                {{ link.name }}
              </RouterLink>
              <a v-else :href="link.href" class="footer__link">{{ link.name }}</a>
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
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.footer__social-link:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.footer__social-link svg {
  width: 43px;
  height: 43px;
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
    background: white;
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
