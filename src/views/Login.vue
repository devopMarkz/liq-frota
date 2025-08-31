<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-section">
        <div class="logo-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12L5 10L9 14L19 4L21 6L9 18L3 12Z" fill="currentColor"/>
          </svg>
        </div>
        <h1 class="app-title">LiqRota</h1>
        <p class="app-subtitle">Calculadora de Frete</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
              <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
            </svg>
            Usuário
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Digite seu usuário"
            required
            :disabled="loading"
          />
        </div>
        
        <div class="form-group">
          <label for="password">
            <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10H19C19.5523 10 20 10.4477 20 11V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11C4 10.4477 4.44772 10 5 10H6ZM8 10H16V8C16 6.89543 15.1046 6 14 6H10C8.89543 6 8 6.89543 8 8V10Z" fill="currentColor"/>
            </svg>
            Senha
          </label>
          <input
            id="password"
            v-model="form.senha"
            type="password"
            placeholder="Digite sua senha"
            required
            :disabled="loading"
          />
        </div>
        
        <button 
          type="submit" 
          class="login-button"
          :disabled="loading"
        >
          <svg v-if="loading" class="loading-spinner" width="20" height="20" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
            </circle>
          </svg>
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
        
        <div v-if="error" class="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          {{ error }}
        </div>
      </form>
      
      <div class="register-link">
        <p>Não tem conta? <router-link to="/register">Cadastre-se</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        senha: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    
    async handleLogin() {
      this.loading = true
      this.error = null
      
      try {
        await this.login(this.form)
        this.$router.push('/trips')
      } catch (error) {
        this.error = error.message || 'Erro ao fazer login'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  padding: 20px;
  position: relative;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.login-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.logo-section {
  text-align: center;
  margin-bottom: 32px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.app-subtitle {
  color: #9ca3af;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 500;
  color: #e5e7eb;
  font-size: 14px;
}

.input-icon {
  margin-right: 8px;
  color: #9ca3af;
}

.form-group input {
  width: 100%;
  padding: 16px;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  font-size: 16px;
  color: #ffffff;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #6b7280;
}

.form-group input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-group input:disabled {
  background-color: #0a0a0a;
  cursor: not-allowed;
  opacity: 0.6;
}

.login-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2);
}

.login-button:disabled {
  background: #374151;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.register-link {
  text-align: center;
  margin-top: 24px;
}

.register-link p {
  margin: 0;
  color: #9ca3af;
  font-size: 14px;
}

.register-link a {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  color: #a855f7;
  text-decoration: underline;
}
</style>