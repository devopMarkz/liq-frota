<template>
  <div class="reports-container">
    <!-- Header com tema escuro e ícones SVG -->
    <div class="header">
      <button @click="$router.go(-1)" class="btn-back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="header-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="header-icon">
          <path d="M9 17H7V10L9 17ZM13 17H11L13 10V17ZM17 17H15L17 10V17ZM19.5 3.5L18 2L6 2L4.5 3.5L3 12L4.5 20.5L6 22H18L19.5 20.5L21 12L19.5 3.5Z" fill="currentColor"/>
        </svg>
        Relatórios
      </h1>
      <div></div>
    </div>
    
    <div class="container">
      <!-- Tabs com tema escuro -->
      <div class="tabs">
        <button 
          class="tab" 
          :class="{ active: activeTab === 'intervalo' }"
          @click="activeTab = 'intervalo'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V8.5C3 7.39543 3.89543 6.5 5 6.5H19C20.1046 6.5 21 7.39543 21 8.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          Intervalo
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'mensal' }"
          @click="activeTab = 'mensal'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 9H21M7 3V5M17 3V5M6 12H10V16H6V12ZM6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          Mensal
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'anual' }"
          @click="activeTab = 'anual'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18.77L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          Anual
        </button>
      </div>
      
      <!-- Relatório por Intervalo -->
      <div v-if="activeTab === 'intervalo'" class="report-section">
        <!-- Card com tema escuro e ícones -->
        <div class="form-card">
          <div class="card-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="card-icon">
              <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V8.5C3 7.39543 3.89543 6.5 5 6.5H19C20.1046 6.5 21 7.39543 21 8.5Z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <h3>Relatório por Período</h3>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M8 2V5M16 2V5M3.5 9.09H20.5" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                Data Início
              </label>
              <input
                v-model="intervaloForm.inicio"
                type="date"
                class="form-input"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M8 2V5M16 2V5M3.5 9.09H20.5" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                Data Fim
              </label>
              <input
                v-model="intervaloForm.fim"
                type="date"
                class="form-input"
                required
              />
            </div>
          </div>
          
          <button @click="loadIntervaloReport" class="btn btn-primary" :disabled="loading">
            <svg v-if="loading" class="loading-spinner" width="16" height="16" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
              </circle>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 3V21H21V9L15 3H3Z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M9 9H15M9 13H15M9 17H13" stroke="currentColor" stroke-width="2"/>
            </svg>
            {{ loading ? 'Carregando...' : 'Gerar Relatório' }}
          </button>
        </div>
        
        <ReportCard v-if="intervaloData" :data="intervaloData" title="Período Selecionado" />
      </div>
      
      <!-- Relatório Mensal -->
      <div v-if="activeTab === 'mensal'" class="report-section">
        <div class="form-card">
          <div class="card-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="card-icon">
              <path d="M3 9H21M7 3V5M17 3V5M6 12H10V16H6V12Z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <h3>Relatório Mensal</h3>
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18.77L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              Ano
            </label>
            <input
              v-model="mensalForm.ano"
              type="number"
              class="form-input"
              :min="1900"
              :max="9999"
              placeholder="2025"
              required
            />
          </div>
          
          <button @click="loadMensalReport" class="btn btn-primary" :disabled="loading">
            <svg v-if="loading" class="loading-spinner" width="16" height="16" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
              </circle>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 3V21H21V9L15 3H3Z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M9 9H15M9 13H15M9 17H13" stroke="currentColor" stroke-width="2"/>
            </svg>
            {{ loading ? 'Carregando...' : 'Gerar Relatório' }}
          </button>
        </div>
        
        <div v-if="mensalData && mensalData.length > 0" class="monthly-reports">
          <ReportCard 
            v-for="item in mensalData" 
            :key="item.mes"
            :data="item" 
            :title="formatMonth(item.mes)"
          />
        </div>
        
        <div v-else-if="mensalData && mensalData.length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="empty-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          <p>Nenhum dado encontrado para o ano selecionado</p>
        </div>
      </div>
      
      <!-- Relatório Anual -->
      <div v-if="activeTab === 'anual'" class="report-section">
        <div class="form-card">
          <div class="card-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="card-icon">
              <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18.77L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <h3>Relatório Anual</h3>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18.77L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                Ano Inicial
              </label>
              <input
                v-model="anualForm.de"
                type="number"
                class="form-input"
                :min="1900"
                :max="9999"
                placeholder="2024"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18.77L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                Ano Final
              </label>
              <input
                v-model="anualForm.ate"
                type="number"
                class="form-input"
                :min="1900"
                :max="9999"
                placeholder="2025"
                required
              />
            </div>
          </div>
          
          <button @click="loadAnualReport" class="btn btn-primary" :disabled="loading">
            <svg v-if="loading" class="loading-spinner" width="16" height="16" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
              </circle>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 3V21H21V9L15 3H3Z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M9 9H15M9 13H15M9 17H13" stroke="currentColor" stroke-width="2"/>
            </svg>
            {{ loading ? 'Carregando...' : 'Gerar Relatório' }}
          </button>
        </div>
        
        <div v-if="anualData && anualData.length > 0" class="yearly-reports">
          <ReportCard 
            v-for="item in anualData" 
            :key="item.ano"
            :data="item" 
            :title="`Ano ${item.ano}`"
          />
        </div>
        
        <div v-else-if="anualData && anualData.length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="empty-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          <p>Nenhum dado encontrado para o período selecionado</p>
        </div>
      </div>
      
      <!-- Alert de erro com tema escuro -->
      <div v-if="error" class="alert alert-error">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
        </svg>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import ReportCard from '../components/ReportCard.vue'

export default {
  name: 'ReportsPage', // Changed component name to multi-word to fix ESLint error
  components: {
    ReportCard
  },
  data() {
    return {
      activeTab: 'intervalo',
      loading: false,
      error: null,
      
      intervaloForm: {
        inicio: '',
        fim: ''
      },
      
      mensalForm: {
        ano: new Date().getFullYear()
      },
      
      anualForm: {
        de: new Date().getFullYear() - 1,
        ate: new Date().getFullYear()
      },
      
      intervaloData: null,
      mensalData: null,
      anualData: null
    }
  },
  methods: {
    async loadIntervaloReport() {
      if (!this.intervaloForm.inicio || !this.intervaloForm.fim) {
        this.error = 'Por favor, preencha as datas de início e fim'
        return
      }
      
      this.loading = true
      this.error = null
      this.intervaloData = null
      
      try {
        const params = {
          inicio: this.intervaloForm.inicio,
          fim: this.intervaloForm.fim
        }
        
        const response = await this.$api.get('/api/v1/relatorios/intervalo', { params })
        this.intervaloData = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async loadMensalReport() {
      if (!this.mensalForm.ano) {
        this.error = 'Por favor, informe o ano'
        return
      }
      
      this.loading = true
      this.error = null
      this.mensalData = null
      
      try {
        const params = { ano: this.mensalForm.ano }
        const response = await this.$api.get('/api/v1/relatorios/mensal', { params })
        this.mensalData = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async loadAnualReport() {
      if (!this.anualForm.de || !this.anualForm.ate) {
        this.error = 'Por favor, preencha os anos inicial e final'
        return
      }
      
      if (this.anualForm.de > this.anualForm.ate) {
        this.error = 'O ano inicial deve ser menor ou igual ao ano final'
        return
      }
      
      this.loading = true
      this.error = null
      this.anualData = null
      
      try {
        const params = {
          de: this.anualForm.de,
          ate: this.anualForm.ate
        }
        
        const response = await this.$api.get('/api/v1/relatorios/anual', { params })
        this.anualData = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    formatMonth(monthString) {
      const [year, month] = monthString.split('-')
      const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ]
      
      return `${monthNames[parseInt(month) - 1]} ${year}`
    }
  }
}
</script>

<style scoped>
/* Tema escuro completo para Reports.vue */
.reports-container {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
}

.btn-back {
  background: #111111;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 12px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-back:hover {
  background: #1f1f1f;
  border-color: #4b5563;
  color: #ffffff;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
}

.header-icon {
  color: #8b5cf6;
}

.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 4px;
  border: 1px solid #2a2a2a;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #9ca3af;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  background: #2a2a2a;
  color: #d1d5db;
}

.tab.active {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: #ffffff;
}

.report-section {
  margin-bottom: 24px;
}

.form-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #2a2a2a;
}

.card-icon {
  color: #8b5cf6;
}

.card-header h3 {
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #e5e7eb;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: #111111;
  border: 1px solid #374151;
  border-radius: 8px;
  font-size: 16px;
  color: #ffffff;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #6b7280;
}

.form-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}

.btn-primary {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
}

.btn-primary:disabled {
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

.monthly-reports,
.yearly-reports {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  margin-top: 24px;
}

.empty-icon {
  color: #6b7280;
  margin-bottom: 16px;
}

.empty-state p {
  margin: 0;
  color: #9ca3af;
  font-size: 16px;
}

.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
  font-weight: 500;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    flex-direction: column;
  }
  
  .tab {
    justify-content: flex-start;
  }
}
</style>
