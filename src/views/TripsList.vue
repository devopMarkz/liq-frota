<template>
  <div class="trips-container">
    <!-- Header redesenhado com tema escuro e ícones SVG -->
    <div class="header">
      <h1>Minhas Viagens</h1>
      <div class="header-actions">
        <router-link to="/reports" class="btn-icon" title="Relatórios">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 3V21H21V3H3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
          </svg>
        </router-link>
        <button @click="logout" class="btn-icon" title="Sair">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="container">
      <!-- Adicionando funcionalidade de acordeão nos filtros -->
      <div class="filters-card">
        <div class="filters-header" @click="toggleFilters">
          <div class="filters-title">
            <svg class="filters-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="currentColor"/>
            </svg>
            Filtros de Busca
          </div>
          <svg 
            class="toggle-arrow" 
            :class="{ 'expanded': filtersExpanded }"
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="currentColor"/>
          </svg>
        </div>
        
        <transition name="accordion">
          <div v-show="filtersExpanded" class="filters-content">
            <div class="filters-grid">
              <div class="form-group">
                <label class="form-label">
                  <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="currentColor"/>
                  </svg>
                  Origem
                </label>
                <input
                  v-model="filters.origem"
                  type="text"
                  class="form-input"
                  placeholder="Ex: São Paulo, SP"
                  @input="debouncedSearch"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">
                  <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="currentColor"/>
                  </svg>
                  Destino
                </label>
                <input
                  v-model="filters.destino"
                  type="text"
                  class="form-input"
                  placeholder="Ex: Rio de Janeiro, RJ"
                  @input="debouncedSearch"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
      
      <!-- Botão Nova Viagem redesenhado -->
      <div class="actions">
        <router-link to="/trips/new" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
          </svg>
          Nova Viagem
        </router-link>
      </div>
      
      <!-- Estados de loading e vazio redesenhados -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <p>Carregando viagens...</p>
      </div>
      
      <div v-else-if="trips.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        <h3>Nenhuma viagem encontrada</h3>
        <p>Comece criando sua primeira viagem</p>
        <router-link to="/trips/new" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
          </svg>
          Criar primeira viagem
        </router-link>
      </div>
      
      <!-- Cards de viagem redesenhados com tema escuro -->
      <div v-else class="trips-list">
        <div v-for="trip in trips" :key="trip.id" class="trip-card">
          <div class="trip-header">
            <div class="route">
              <svg class="route-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
              </svg>
              <span class="origin">{{ trip.origem }}</span>
              <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
              </svg>
              <span class="destination">{{ trip.destino }}</span>
            </div>
            <div class="trip-actions">
              <router-link :to="`/trips/${trip.id}/edit`" class="btn-icon" title="Editar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
                </svg>
              </router-link>
              <button @click="deleteTrip(trip.id)" class="btn-icon btn-danger" title="Excluir">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="trip-details">
            <div class="detail-item">
              <svg class="detail-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
              <span class="detail-label">Distância:</span>
              <span class="detail-value">{{ formatNumber(trip.distanciaKm) }} km</span>
            </div>
            <div class="detail-item">
              <svg class="detail-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.5 11.8 10.9Z" fill="currentColor"/>
              </svg>
              <span class="detail-label">Valor Frete:</span>
              <span class="detail-value">{{ formatCurrency(trip.valorFrete) }}</span>
            </div>
            <div class="detail-item">
              <svg class="detail-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3.09 8.26L12 14L20.91 8.26L12 2ZM21 16L12 22L3 16L12 10L21 16Z" fill="currentColor"/>
              </svg>
              <span class="detail-label">Valor Líquido:</span>
              <span class="detail-value profit">{{ formatCurrency(trip.valorLiquido) }}</span>
            </div>
            <div v-if="trip.idaEVolta" class="detail-item">
              <svg class="detail-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
              </svg>
              <span class="detail-label">Ida e Volta:</span>
              <span class="detail-value">Sim</span>
            </div>
          </div>
          
          <div class="trip-date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" fill="currentColor"/>
            </svg>
            {{ formatDate(trip.createdAt) }}
          </div>
        </div>
      </div>
      
      <!-- Paginação redesenhada -->
      <div v-if="pagination.totalPages > 1" class="pagination">
        <button 
          @click="changePage(pagination.number - 1)"
          :disabled="pagination.first"
          class="pagination-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="currentColor"/>
          </svg>
          Anterior
        </button>
        
        <span class="pagination-info">{{ pagination.number + 1 }} de {{ pagination.totalPages }}</span>
        
        <button 
          @click="changePage(pagination.number + 1)"
          :disabled="pagination.last"
          class="pagination-btn"
        >
          Próxima
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency, formatNumber, formatDate } from '../utils/formatters'

export default {
  name: 'TripsList',
  data() {
    return {
      trips: [],
      loading: false,
      filters: {
        origem: '',
        destino: ''
      },
      pagination: {
        number: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
        first: true,
        last: true
      },
      searchTimeout: null,
      filtersExpanded: true
    }
  },
  mounted() {
    this.loadTrips()
    this.checkMobileView()
    window.addEventListener('resize', this.checkMobileView)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobileView)
  },
  methods: {
    formatCurrency,
    formatNumber,
    formatDate,
    
    toggleFilters() {
      this.filtersExpanded = !this.filtersExpanded
    },
    
    checkMobileView() {
      if (window.innerWidth <= 768) {
        this.filtersExpanded = false
      } else {
        this.filtersExpanded = true
      }
    },
    
    async loadTrips() {
      this.loading = true
      
      try {
        const params = {
          page: this.pagination.number,
          size: this.pagination.size
        }
        
        if (this.filters.origem) params.origem = this.filters.origem
        if (this.filters.destino) params.destino = this.filters.destino
        
        const response = await this.$api.get('/api/v1/trips', { params })
        const data = response.data
        
        this.trips = data.content || []
        this.pagination = {
          number: data.number,
          size: data.size,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          first: data.first,
          last: data.last
        }
      } catch (error) {
        console.error('Erro ao carregar viagens:', error)
      } finally {
        this.loading = false
      }
    },
    
    debouncedSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.pagination.number = 0
        this.loadTrips()
      }, 500)
    },
    
    changePage(page) {
      this.pagination.number = page
      this.loadTrips()
    },
    
    async deleteTrip(id) {
      // Usar modal para confirmação ao invés de confirm()
      this.$root.$modal({
        type: 'warning',
        title: 'Confirmar Exclusão',
        message: 'Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita.',
        confirmText: 'Excluir',
        showCancel: true,
        onConfirm: async () => {
          try {
            await this.$api.delete(`/api/v1/trips/${id}`)
            
            // Modal de sucesso ao invés de alert
            this.$root.$modal({
              type: 'success',
              title: 'Viagem Excluída',
              message: 'A viagem foi excluída com sucesso.',
              confirmText: 'OK'
            })
            
            this.loadTrips()
          } catch (error) {
            // Modal de erro ao invés de alert()
            this.$root.$modal({
              type: 'error',
              title: 'Erro ao Excluir',
              message: `Não foi possível excluir a viagem: ${error.message || 'Erro desconhecido'}`,
              confirmText: 'OK'
            })
          }
        }
      })
    },
    
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.trips-container {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
}

.header h1 {
  margin: 0;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #9ca3af;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: #3a3a3a;
  color: #ffffff;
  transform: translateY(-1px);
}

.btn-icon.btn-danger:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filters-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
}

/* Estilos para o cabeçalho do acordeão de filtros */
.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
}

.filters-header:hover {
  background: #1f1f1f;
}

.filters-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #ffffff;
  font-size: 16px;
}

.filters-icon {
  color: #8b5cf6;
}

.toggle-arrow {
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.toggle-arrow.expanded {
  transform: rotate(180deg);
}

/* Container para o conteúdo dos filtros */
.filters-content {
  padding: 0 20px 20px 20px;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
}

/* Animações para o acordeão */
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter, .accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to, .accordion-leave {
  max-height: 200px;
  opacity: 1;
}

.actions {
  margin-bottom: 24px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9ca3af;
}

.loading-spinner {
  margin-bottom: 16px;
  color: #8b5cf6;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  color: #6b7280;
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 8px 0;
  color: #e5e7eb;
  font-size: 18px;
}

.empty-state p {
  margin: 0 0 24px 0;
  color: #9ca3af;
}

.trips-list {
  display: grid;
  gap: 16px;
}

.trip-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
}

.trip-card:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.trip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.route {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.route-icon {
  color: #8b5cf6;
}

.origin, .destination {
  color: #ffffff;
}

.arrow-icon {
  color: #6b7280;
}

.trip-actions {
  display: flex;
  gap: 8px;
}

.trip-details {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.detail-icon {
  color: #6b7280;
  flex-shrink: 0;
}

.detail-label {
  color: #9ca3af;
  min-width: 100px;
}

.detail-value {
  color: #e5e7eb;
  font-weight: 500;
}

.detail-value.profit {
  color: #10b981;
  font-weight: 600;
}

.trip-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
  justify-content: flex-end;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding: 20px 0;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #3a3a3a;
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #9ca3af;
  font-size: 14px;
}

/* Adicionando estilos para os campos de filtro com tema escuro */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #e5e7eb;
}

.input-icon {
  color: #8b5cf6;
  flex-shrink: 0;
}

.form-input {
  background: #111111;
  border: 1px solid #374151;
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  width: 100%;
}

.form-input::placeholder {
  color: #6b7280;
}

.form-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-input:hover {
  border-color: #4b5563;
}
</style>
