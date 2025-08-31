<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <div class="modal-icon" :class="iconClass">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path v-if="type === 'success'" d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
              <path v-else-if="type === 'error'" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              <path v-else-if="type === 'warning'" d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="currentColor"/>
              <path v-else d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 class="modal-title">{{ title }}</h3>
          <button @click="close" class="modal-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        
        <div class="modal-footer">
          <button v-if="showCancel" @click="cancel" class="modal-button modal-button-secondary">
            Cancelar
          </button>
          <button @click="confirm" class="modal-button modal-button-primary" :class="buttonClass">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'FloatingModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info', // success, error, warning, info
      validator: value => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'OK'
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconClass() {
      return {
        'modal-icon-success': this.type === 'success',
        'modal-icon-error': this.type === 'error',
        'modal-icon-warning': this.type === 'warning',
        'modal-icon-info': this.type === 'info'
      }
    },
    buttonClass() {
      return {
        'modal-button-success': this.type === 'success',
        'modal-button-error': this.type === 'error',
        'modal-button-warning': this.type === 'warning',
        'modal-button-info': this.type === 'info'
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    },
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #2a2a2a;
}

.modal-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.modal-icon-success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.modal-icon-error {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.modal-icon-warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.modal-icon-info {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.modal-title {
  flex: 1;
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #2a2a2a;
  color: #ffffff;
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  margin: 0;
  color: #d1d5db;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #2a2a2a;
}

.modal-button {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-button-secondary {
  background: #374151;
  color: #d1d5db;
}

.modal-button-secondary:hover {
  background: #4b5563;
}

.modal-button-primary {
  color: white;
}

.modal-button-success {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.modal-button-success:hover {
  background: linear-gradient(135deg, #16a34a, #15803d);
}

.modal-button-error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.modal-button-error:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
}

.modal-button-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.modal-button-warning:hover {
  background: linear-gradient(135deg, #d97706, #b45309);
}

.modal-button-info {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.modal-button-info:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-fade-enter, .modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}
</style>