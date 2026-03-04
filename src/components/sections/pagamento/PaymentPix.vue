<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  back: []
}>()

const mockPixCode = ref('00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540580.005802BR5925MORADA DOS PETS LTDA6009SAO PAULO62140510MORADA2025')
const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(mockPixCode.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 3000)
  } catch {
    // Fallback
    const input = document.createElement('textarea')
    input.value = mockPixCode.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => { copied.value = false }, 3000)
  }
}
</script>

<template>
  <div class="payment-pix">
    <h3 class="payment-pix__title">Realize o pagamento</h3>

    <div class="payment-pix__methods">
      <!-- Método ID (esquerda) -->
      <div class="payment-pix__method-id">
        <p class="payment-pix__subtitle">Utilizando um identificador único (ID)</p>
        <div class="payment-pix__code-input-wrapper">
          <input
            type="text"
            :value="mockPixCode"
            readonly
            class="payment-pix__code-input"
            aria-label="Código PIX"
          />
        </div>
        <button
          class="payment-pix__copy-btn"
          @click="copyCode"
        >
          {{ copied ? 'Copiado!' : 'Copiar código' }}
        </button>
      </div>

      <!-- Divisor "OU" -->
      <div class="payment-pix__divider">
        <span class="payment-pix__divider-text">OU</span>
      </div>

      <!-- Método QR Code (direita) -->
      <div class="payment-pix__method-qr">
        <p class="payment-pix__subtitle">Lendo o código QR no aplicativo do seu banco</p>
        <div class="payment-pix__qr-code" aria-label="QR Code para pagamento PIX">
          <!-- QR Code placeholder SVG -->
          <svg width="197" height="197" viewBox="0 0 197 197" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="197" height="197" rx="8" fill="#F5F5F5" stroke="#291000" stroke-width="1"/>
            <!-- Simplified QR code pattern -->
            <rect x="20" y="20" width="50" height="50" rx="4" fill="#291000"/>
            <rect x="127" y="20" width="50" height="50" rx="4" fill="#291000"/>
            <rect x="20" y="127" width="50" height="50" rx="4" fill="#291000"/>
            <rect x="30" y="30" width="30" height="30" rx="2" fill="#F5F5F5"/>
            <rect x="137" y="30" width="30" height="30" rx="2" fill="#F5F5F5"/>
            <rect x="30" y="137" width="30" height="30" rx="2" fill="#F5F5F5"/>
            <rect x="38" y="38" width="14" height="14" rx="1" fill="#291000"/>
            <rect x="145" y="38" width="14" height="14" rx="1" fill="#291000"/>
            <rect x="38" y="145" width="14" height="14" rx="1" fill="#291000"/>
            <!-- Center pattern -->
            <rect x="85" y="85" width="27" height="27" rx="3" fill="#291000"/>
            <rect x="80" y="20" width="10" height="10" fill="#291000"/>
            <rect x="95" y="20" width="10" height="10" fill="#291000"/>
            <rect x="80" y="35" width="10" height="10" fill="#291000"/>
            <rect x="80" y="55" width="10" height="10" fill="#291000"/>
            <rect x="95" y="55" width="10" height="10" fill="#291000"/>
            <rect x="110" y="55" width="10" height="10" fill="#291000"/>
            <rect x="20" y="80" width="10" height="10" fill="#291000"/>
            <rect x="35" y="95" width="10" height="10" fill="#291000"/>
            <rect x="55" y="80" width="10" height="10" fill="#291000"/>
            <rect x="55" y="95" width="10" height="10" fill="#291000"/>
            <rect x="130" y="85" width="10" height="10" fill="#291000"/>
            <rect x="155" y="80" width="10" height="10" fill="#291000"/>
            <rect x="167" y="95" width="10" height="10" fill="#291000"/>
            <rect x="80" y="130" width="10" height="10" fill="#291000"/>
            <rect x="95" y="130" width="10" height="10" fill="#291000"/>
            <rect x="130" y="130" width="10" height="10" fill="#291000"/>
            <rect x="155" y="145" width="10" height="10" fill="#291000"/>
            <rect x="130" y="155" width="10" height="10" fill="#291000"/>
            <rect x="155" y="167" width="10" height="10" fill="#291000"/>
            <rect x="167" y="155" width="10" height="10" fill="#291000"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Tutorial -->
    <div class="payment-pix__tutorial">
      <h4 class="payment-pix__tutorial-title">Como funciona o pagamento com ID?</h4>
      <div class="payment-pix__tutorial-steps">
        <div class="payment-pix__tutorial-step">
          <div class="payment-pix__step-indicator">
            <span class="payment-pix__step-number">1</span>
          </div>
          <p class="payment-pix__step-text">Copie o código da transação</p>
        </div>
        <div class="payment-pix__tutorial-connector" />
        <div class="payment-pix__tutorial-step">
          <div class="payment-pix__step-indicator">
            <span class="payment-pix__step-number">2</span>
          </div>
          <p class="payment-pix__step-text">Cole o código do PIX no aplicativo do seu banco para ser identificado o pagamento</p>
        </div>
      </div>
    </div>

    <!-- Botão anterior -->
    <div class="payment-pix__actions">
      <button class="payment-pix__btn payment-pix__btn--outline" @click="emit('back')">
        Anterior
      </button>
    </div>
  </div>
</template>
