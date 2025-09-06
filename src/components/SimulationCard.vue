<template>
  <div class="simulation-card">
    <h4 v-if="title" class="card-title">
      <svg class="title-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 11H15L13 9H11L9 11ZM12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
      </svg>
      {{ title }}
    </h4>
    
    <div class="route-info">
      <div class="route">
        <div class="location">
          <svg class="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="currentColor"/>
          </svg>
          <span class="origin">{{ result.origem }}</span>
        </div>
        <div class="arrow-container">
          <svg class="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="location">
          <svg class="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="currentColor"/>
          </svg>
          <span class="destination">{{ result.destino }}</span>
        </div>
      </div>
      
      <div class="route-details">
        <div class="round-trip" v-if="result.idaEVolta">
          <svg class="badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
          </svg>
          <span class="badge">Ida e Volta</span>
        </div>
      </div>
    </div>
    
    <div class="metrics-grid">
      <div class="metric">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          <span class="label">Distância Considerada</span>
        </div>
        <span class="value">{{ formatNumber(result.distanciaConsideradaKm) }} km</span>
      </div>
      
      <div class="metric" v-if="result.duracaoFormatada">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 7H11V12.41L15.29 16.71L16.71 15.29L13 11.59V7Z" fill="currentColor"/>
          </svg>
          <span class="label">Duração da Viagem</span>
        </div>
        <span class="value">{{ result.duracaoFormatada }}</span>
      </div>
      
      <div class="metric cost">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3.5 18.49L6 16L8.5 18.49L6 21L3.5 18.49ZM11.5 12.99L14 10.5L16.5 12.99L14 15.5L11.5 12.99ZM19.5 7.49L22 5L24.5 7.49L22 10L19.5 7.49Z" fill="currentColor"/>
          </svg>
          <span class="label">Custo Combustível</span>
        </div>
        <span class="value">{{ formatCurrency(result.custoCombustivel) }}</span>
      </div>
      
      <div class="metric cost">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          <span class="label">Gastos Adicionais</span>
        </div>
        <span class="value">{{ formatCurrency(result.gastosAdicionais) }}</span>
      </div>
      
      <div class="metric cost">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.5 11.8 10.9Z" fill="currentColor"/>
          </svg>
          <span class="label">Gasto Total</span>
        </div>
        <span class="value">{{ formatCurrency(result.gastoTotal) }}</span>
      </div>
      
      <div class="metric revenue">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 15H9C9 16.08 10.37 17 12 17S15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7S9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z" fill="currentColor"/>
          </svg>
          <span class="label">Valor do Frete</span>
        </div>
        <span class="value">{{ formatCurrency(result.valorFrete) }}</span>
      </div>
      
      <div class="metric highlight profit">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          <span class="label">Valor Líquido</span>
        </div>
        <span class="value">{{ formatCurrency(result.valorLiquido) }}</span>
      </div>
      
      <div class="metric highlight profit">
        <div class="metric-header">
          <svg class="metric-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M13 7H11V9H13V7ZM13 11H11V17H13V11ZM12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z" fill="currentColor"/>
          </svg>
          <span class="label">Ganho por Km</span>
        </div>
        <span class="value">{{ formatCurrency(result.ganhoPorKm) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency, formatNumber } from '@/utils/formatters'

export default {
  name: 'SimulationCard',
  props: {
    result: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  },
  methods: {
    formatCurrency,
    formatNumber
  }
}
</script>

<style scoped>
.simulation-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.simulation-card:hover {
  border-color: #374151;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.card-title {
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  gap: 8px;
}

.title-icon {
  color: #8b5cf6;
}

.route-info {
  margin-bottom: 24px;
  padding: 16px;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
}

.route {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.location-icon {
  color: #9ca3af;
}

.origin, .destination {
  font-weight: 600;
  color: #ffffff;
  font-size: 14px;
}

.arrow-container {
  display: flex;
  align-items: center;
  margin: 0 16px;
}

.arrow {
  color: #8b5cf6;
}

.route-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.round-trip {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  transition: all 0.2s ease;
  margin-bottom: 5px;
}

.metric:hover {
  border-color: #374151;
  background: #1f1f1f;
}

.metric.highlight {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05));
  border-color: rgba(34, 197, 94, 0.3);
}

.metric.cost {
  border-left: 3px solid #ef4444;
}

.metric.revenue {
  border-left: 3px solid #3b82f6;
}

.metric.profit {
  border-left: 3px solid #22c55e;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-icon {
  color: #9ca3af;
}

.metric.cost .metric-icon {
  color: #ef4444;
}

.metric.revenue .metric-icon {
  color: #3b82f6;
}

.metric.profit .metric-icon {
  color: #22c55e;
}

.metric .label {
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
}

.metric .value {
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
}

.metric.highlight .value {
  color: #22c55e;
  font-size: 18px;
  font-weight: 700;
}

@media (max-width: 480px) {
  .simulation-card {
    padding: 16px;
  }
  
  .metrics-grid {
    gap: 8px;
  }
  
  .metric {
    padding: 12px;
  }
  
  .metric .value {
    font-size: 14px;
  }
  
  .route-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
