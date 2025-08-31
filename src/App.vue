<template>
  <div id="app">
    <router-view/>
    <floating-modal
      :show="modal.show"
      :type="modal.type"
      :title="modal.title"
      :message="modal.message"
      :confirm-text="modal.confirmText"
      :show-cancel="modal.showCancel"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
      @close="handleModalClose"
    />
  </div>
</template>

<script>
import FloatingModal from '@/components/FloatingModal.vue'

export default {
  name: 'App',
  components: {
    FloatingModal
  },
  data() {
    return {
      modal: {
        show: false,
        type: 'info',
        title: '',
        message: '',
        confirmText: 'OK',
        showCancel: false,
        onConfirm: null,
        onCancel: null
      }
    }
  },
  created() {
    // Registrar modal globalmente
    this.$root.$modal = this.showModal
  },
  methods: {
    showModal({ type = 'info', title, message, confirmText = 'OK', showCancel = false, onConfirm = null, onCancel = null }) {
      this.modal = {
        show: true,
        type,
        title,
        message,
        confirmText,
        showCancel,
        onConfirm,
        onCancel
      }
    },
    handleModalConfirm() {
      if (this.modal.onConfirm) {
        this.modal.onConfirm()
      }
      this.modal.show = false
    },
    handleModalCancel() {
      if (this.modal.onCancel) {
        this.modal.onCancel()
      }
      this.modal.show = false
    },
    handleModalClose() {
      this.modal.show = false
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  background: #0a0a0a;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

/* Utilitários globais */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 24px; }

.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }

/* Animações globais */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Responsividade */
@media (max-width: 768px) {
  body {
    font-size: 16px;
  }
}

/* Focus styles para acessibilidade */
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

/* Seleção de texto */
::selection {
  background: rgba(139, 92, 246, 0.3);
  color: #ffffff;
}
</style>