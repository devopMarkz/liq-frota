<template>
  <div class="report-card">
    <div class="card-header">
      <svg class="header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 11H15L13 9H11L9 11ZM12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z" fill="currentColor"/>
      </svg>
      <h4>{{ title }}</h4>
    </div>
    
    <div class="report-grid">
      <div class="report-item">
        <div class="item-label">
          <svg class="item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="currentColor"/>
          </svg>
          <span>Total Distância</span>
        </div>
        <span class="item-value">{{ formatNumber(data.totalDistanciaConsideradaKm) }} km</span>
      </div>
      
      <div class="report-item">
        <div class="item-label">
          <svg class="item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19.77 7.23L19.78 7.22L16.06 3.5L15 4.56L17.11 6.67C16.17 7.03 15.5 7.93 15.5 9C15.5 10.38 16.62 11.5 18 11.5S20.5 10.38 20.5 9C20.5 8.31 20.22 7.68 19.77 7.23Z" fill="currentColor"/>
          </svg>
          <span>Total Combustível</span>
        </div>
        <span class="item-value cost">{{ formatCurrency(data.totalCustoCombustivel) }}</span>
      </div>
      
      <div class="report-item">
        <div class="item-label">
          <svg class="item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          <span>Total Gastos Adicionais</span>
        </div>
        <span class="item-value cost">{{ formatCurrency(data.totalGastosAdicionais) }}</span>
      </div>
      
      <div class="report-item">
        <div class="item-label">
          <svg class="item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          <span>Total Gastos</span>
        </div>
        <span class="item-value cost">{{ formatCurrency(data.totalGastoTotal) }}</span>
      </div>
      
      <div class="report-item">
        <div class="item-label">
          <svg class="item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.5 11.8 10.9Z" fill="currentColor"/>
          </svg>
          <span>Total Frete</span>
        </div>
        <span class="item-value revenue">{{ formatCurrency(data.totalValorFrete) }}</span>
      </div>
      
      <div class="report-item highlight">
        <div class="item-label">
          <svg class="item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
          </svg>
          <span>Total Líquido</span>
        </div>
        <span class="item-value profit">{{ formatCurrency(data.totalValorLiquido) }}</span>
      </div>
      
      <div class="report-item">
        <div class="item-label">
          <svg class="item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M13 9H11V7H13M13 17H11V11H13M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z" fill="currentColor"/>
          </svg>
          <span>Ganho Médio por Km</span>
        </div>
        <span class="item-value">{{ formatCurrency(data.ganhoPorKmMedio || data.ganhoPorKmTotal) }}/km</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency, formatNumber } from '../utils/formatters'

export default {
  name: 'ReportCard',
  props: {
    data: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    formatCurrency,
    formatNumber
  }
}
</script>

<style scoped>
/* Aplicando tema escuro completo ao ReportCard */
.report-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #2a2a2a;
}

.header-icon {
  margin-right: 12px;
  color: #8b5cf6;
}

.card-header h4 {
  color: #ffffff;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.report-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.report-item:hover {
  background: #1f1f1f;
  border-color: #374151;
}

.report-item.highlight {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1));
  border-color: #8b5cf6;
  font-weight: 600;
}

.item-label {
  display: flex;
  align-items: center;
  color: #d1d5db;
  font-size: 14px;
}

.item-icon {
  margin-right: 8px;
  color: #9ca3af;
}

.item-value {
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}

.cost {
  color: #ef4444;
}

.revenue {
  color: #3b82f6;
}

.profit {
  color: #22c55e;
  font-size: 16px;
}

.highlight .item-value.profit {
  color: #8b5cf6;
  font-size: 18px;
}
</style>
