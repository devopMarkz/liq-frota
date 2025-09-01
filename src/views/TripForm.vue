<template>
  <div class="trip-form-container">
    <!-- Redesenhado header com tema escuro e ícones -->
    <div class="header">
      <button @click="$router.go(-1)" class="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1>{{ isEdit ? 'Editar Viagem' : 'Nova Viagem' }}</h1>
      <div class="header-spacer"></div>
    </div>
    
    <div class="container">
      <!-- Tabs redesenhadas com tema escuro -->
      <div v-if="!isEdit" class="tabs">
        <button 
          class="tab" 
          :class="{ active: mode === 'individual' }"
          @click="switchMode('individual')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Individual
        </button>
        <button 
          class="tab" 
          :class="{ active: mode === 'lote' }"
          @click="switchMode('lote')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15H17M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM23 7C23 9.20914 21.2091 11 19 11C16.7909 11 15 9.20914 15 7C15 4.79086 16.7909 3 19 3C21.2091 3 23 4.79086 23 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Lote
        </button>
      </div>
      
      <!-- Modo Individual -->
      <div v-if="isEdit || mode === 'individual'" class="individual-form">
        <div class="form-card">
          <!-- Adicionando funcionalidade de acordeão no formulário individual -->
          <div class="accordion-header" @click="toggleIndividualForm">
            <div class="accordion-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ isEdit ? 'Editar Dados da Viagem' : 'Dados da Viagem' }}</span>
            </div>
            <svg 
              class="accordion-arrow" 
              :class="{ 'rotated': individualFormExpanded }"
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <transition name="accordion">
            <div v-show="individualFormExpanded" class="accordion-content">
              <!-- Usando TripFormFields ao invés de FreteForm -->
              <TripFormFields 
                v-model="individualForm"
                :errors="formErrors"
              />
              
              <!-- Botão de recálculo redesenhado -->
              <div v-if="isEdit" class="edit-actions">
                <button @click="recalculate" class="action-button secondary" :disabled="loading">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M1 4V10H7M23 20V14H17M20.49 9C19.9828 7.56678 19.1209 6.28392 17.9845 5.27493C16.8482 4.26595 15.4745 3.56905 13.9917 3.24575C12.5089 2.92246 10.9652 2.98546 9.51691 3.42597C8.06861 3.86648 6.76071 4.66897 5.71 5.75L1 10M23 14L18.29 18.25C17.2393 19.331 15.9314 20.1335 14.4831 20.574C13.0348 21.0145 11.4911 21.0775 10.0083 20.7542C8.52547 20.431 7.1518 19.734 6.01547 18.7251C4.87913 17.7161 4.01717 16.4332 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Recalcular (Preview)
                </button>
              </div>
              
              <!-- Botões de ação redesenhados -->
              <div class="form-actions">
                <button @click="simulate" class="action-button primary" :disabled="loading">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
                    <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ loading ? 'Simulando...' : 'Simular' }}
                </button>
                
                <button @click="persist" class="action-button success" :disabled="loading">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16L20 7V20C20 20.5523 19.5523 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="9,9 9,15 15,15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ loading ? 'Salvando...' : 'Salvar' }}
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      
      <!-- Modo Lote -->
      <div v-if="!isEdit && mode === 'lote'" class="lote-form">
        <!-- Header do lote redesenhado -->
        <div class="lote-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4M16 4C16 5.10457 15.1046 6 14 6H10C8.89543 6 8 5.10457 8 4M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Viagens do Lote ({{ loteItems.length }})
          </h3>
          <button @click="addLoteItem" class="add-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H5H21M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19ZM10 11V17M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Adicionar
          </button>
        </div>
        
        <!-- Items do lote redesenhados com acordeão -->
        <div v-for="(item, index) in loteItems" :key="index" class="lote-item">
          <div class="lote-item-header" @click="toggleLoteItem(index)">
            <span class="lote-item-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 11L12 14L22 4M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 20V5C3.89543 5 4.89543 4 6 4H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Viagem {{ index + 1 }}
            </span>
            <div class="lote-item-actions">
              <button class="toggle-button" type="button">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  :class="{ 'rotated': expandedLoteItems[index] }"
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button @click.stop="removeLoteItem(index)" class="remove-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H5H21M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19ZM10 11V17M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Adicionado transição e controle de visibilidade para acordeão -->
          <transition name="accordion">
            <div v-show="expandedLoteItems[index]" class="lote-item-content">
              <TripFormFields 
                v-model="loteItems[index]"
                :errors="loteErrors[index] || {}"
              />
            </div>
          </transition>
        </div>
        
        <div class="form-actions">
          <button @click="simulateLote" class="action-button primary" :disabled="loading || loteItems.length === 0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
              <circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ loading ? 'Simulando...' : 'Simular Lote' }}
          </button>
          
          <button @click="persistLote" class="action-button success" :disabled="loading || loteItems.length === 0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16L20 7V20C20 20.5523 19.5523 21 19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="9,9 9,15 15,15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ loading ? 'Salvando...' : 'Salvar Lote' }}
          </button>
        </div>
      </div>
      
      <!-- Resultados da Simulação -->
      <div v-if="simulationResult" class="simulation-result">
        <h3 class="result-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 11L12 14L22 4M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 20V5C3.89543 5 4.89543 4 6 4H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Resultado da Simulação
        </h3>
        
        <div v-if="isEdit || mode === 'individual'" class="individual-result">
          <SimulationCard :result="simulationResult" />
        </div>
        
        <div v-if="!isEdit && mode === 'lote'" class="lote-result">
          <!-- Implementado acordeão para resultados das viagens -->
          <div v-for="(item, index) in simulationResult.itens" :key="index" class="result-item">
            <div class="result-item-header" @click="toggleResultItem(index)">
              <h4 class="result-item-title">Viagem {{ index + 1 }}</h4>
              <button class="toggle-button" type="button">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  :class="{ 'rotated': expandedResultItems[index] }"
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            
            <transition name="accordion">
              <div v-show="expandedResultItems[index]" class="result-item-content">
                <SimulationCard :result="item" />
              </div>
            </transition>
          </div>
          
          <!-- Totais do lote usando estrutura simples -->
          <div v-if="simulationResult.totais" class="totals-card">
            <h4 class="totals-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="7.5,4.21 12,6.81 16.5,4.21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="7.5,19.79 7.5,14.6 3,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="21,12 16.5,14.6 16.5,19.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="12,22.08 12,17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Totais do Lote
            </h4>
            <div class="totals-grid">
              <div class="total-item">
                <span class="label">Distância Total:</span>
                <span class="value">{{ formatNumber(simulationResult.totais.totalDistanciaConsideradaKm || 0) }} km</span>
              </div>
              <div class="total-item">
                <span class="label">Combustível Total:</span>
                <span class="value">{{ formatCurrency(simulationResult.totais.totalCustoCombustivel || 0) }}</span>
              </div>
              <div class="total-item">
                <span class="label">Gastos Adicionais:</span>
                <span class="value">{{ formatCurrency(simulationResult.totais.totalGastosAdicionais || 0) }}</span>
              </div>
              <div class="total-item">
                <span class="label">Gasto Total:</span>
                <span class="value">{{ formatCurrency(simulationResult.totais.totalGastoTotal || 0) }}</span>
              </div>
              <div class="total-item">
                <span class="label">Valor Frete:</span>
                <span class="value">{{ formatCurrency(simulationResult.totais.totalValorFrete || 0) }}</span>
              </div>
              <div class="total-item highlight">
                <span class="label">Valor Líquido:</span>
                <span class="value">{{ formatCurrency(simulationResult.totais.totalValorLiquido || 0) }}</span>
              </div>
              <div class="total-item highlight">
                <span class="label">Ganho por Km:</span>
                <span class="value">{{ formatCurrency(simulationResult.totais.ganhoPorKmTotal || 0) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Preview de Recálculo -->
      <div v-if="recalculateResult" class="recalculate-result">
        <h3 class="result-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M1 4V10H7M23 20V14H17M20.49 9C19.9828 7.56678 19.1209 6.28392 17.9845 5.27493C16.8482 4.26595 15.4745 3.56905 13.9917 3.24575C12.5089 2.92246 10.9652 2.98546 9.51691 3.42597C8.06861 3.86648 6.76071 4.66897 5.71 5.75L1 10M23 14L18.29 18.25C17.2393 19.331 15.9314 20.1335 14.4831 20.574C13.0348 21.0145 11.4911 21.0775 10.0083 20.7542C8.52547 20.431 7.1518 19.734 6.01547 18.7251C4.87913 17.7161 4.01717 16.4332 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Preview do Recálculo
        </h3>
        <SimulationCard :result="recalculateResult" />
      </div>
    </div>
  </div>
</template>

<script>
import TripFormFields from '@/components/TripFormFields.vue'
import SimulationCard from '@/components/SimulationCard.vue'
import api from '@/plugins/axios'
import { formatCurrency, formatNumber, parseNumber } from '@/utils/formatters'

export default {
  name: 'TripForm',
  components: {
    TripFormFields,
    SimulationCard
  },
  data() {
    return {
      mode: 'individual',
      loading: false,
      
      individualForm: {
        origem: '',
        destino: '',
        distanciaKm: '',
        consumoKmPorLitro: '',
        precoLitro: '',
        gastosAdicionais: '',
        valorFrete: '',
        ganhoPorKmDesejado: '', // Corrigido nome do campo para coincidir com TripFormFields
        idaEVolta: false,
        modo: 'frete' // Corrigido nome do campo para coincidir com TripFormFields
      },
      
      loteItems: [],
      
      formErrors: {},
      loteErrors: [],
      
      simulationResult: null,
      recalculateResult: null,
      
      expandedLoteItems: {},
      expandedResultItems: {},
      individualFormExpanded: true // Começa expandido por padrão
    }
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id
    }
  },
  async mounted() {
    if (this.isEdit) {
      await this.loadTrip()
    } else {
      this.addLoteItem() // Adiciona um item inicial no lote
    }
  },
  methods: {
    formatCurrency,
    formatNumber,
    
    validateForm(form) {
      const errors = {}
      
      if (!form.origem || form.origem.trim() === '') {
        errors.origem = 'Origem é obrigatória'
      }
      
      if (!form.destino || form.destino.trim() === '') {
        errors.destino = 'Destino é obrigatório'
      }
      
      if (!form.distanciaKm || parseNumber(form.distanciaKm) <= 0) {
        errors.distanciaKm = 'Distância deve ser maior que 0'
      }
      
      if (!form.consumoKmPorLitro || parseNumber(form.consumoKmPorLitro) <= 0) {
        errors.consumoKmPorLitro = 'Consumo deve ser maior que 0'
      }
      
      if (!form.precoLitro || parseNumber(form.precoLitro) <= 0) {
        errors.precoLitro = 'Preço do litro deve ser maior que 0'
      }
      
      if (!form.gastosAdicionais || parseNumber(form.gastosAdicionais) < 0) {
        errors.gastosAdicionais = 'Gastos adicionais não podem ser negativos'
      }
      
      if (form.modo === 'frete') {
        if (!form.valorFrete || parseNumber(form.valorFrete) <= 0) {
          errors.valorFrete = 'Valor do frete deve ser maior que 0'
        }
      } else if (form.modo === 'ganho') {
        if (!form.ganhoPorKmDesejado || parseNumber(form.ganhoPorKmDesejado) <= 0) {
          errors.ganhoPorKmDesejado = 'Ganho por km deve ser maior que 0'
        }
      }
      
      return errors
    },
    
    showErrorModal(message) {
      this.$root.$modal({
        type: 'error',
        title: 'Erro de Validação',
        message: message,
        confirmText: 'OK'
      })
    },
    
    showSuccessModal(message, callback = null) {
      this.$root.$modal({
        type: 'success',
        title: 'Sucesso',
        message: message,
        confirmText: 'OK',
        onConfirm: callback
      })
    },
    
    async loadTrip() {
      try {
        const response = await api.get(`/api/v1/trips/${this.$route.params.id}`)
        const trip = response.data
        
        this.individualForm = {
          origem: trip.origem,
          destino: trip.destino,
          distanciaKm: trip.distanciaKm.toString().replace('.', ','),
          consumoKmPorLitro: trip.consumoKmPorLitro.toString().replace('.', ','),
          precoLitro: trip.precoLitro.toString().replace('.', ','),
          gastosAdicionais: trip.gastosAdicionais.toString().replace('.', ','),
          valorFrete: trip.valorFrete ? trip.valorFrete.toString().replace('.', ',') : '',
          ganhoPorKmDesejado: trip.ganhoPorKmDesejado ? trip.ganhoPorKmDesejado.toString().replace('.', ',') : '', // Corrigido nome do campo
          idaEVolta: trip.idaEVolta,
          modo: trip.modo || 'frete' // Corrigido nome do campo
        }
      } catch (error) {
        this.showErrorModal('Erro ao carregar viagem: ' + error.message)
      }
    },
    
    addLoteItem() {
      const index = this.loteItems.length
      this.loteItems.push({
        origem: '',
        destino: '',
        distanciaKm: '',
        consumoKmPorLitro: '',
        precoLitro: '',
        gastosAdicionais: '',
        valorFrete: '',
        ganhoPorKmDesejado: '', // Corrigido nome do campo
        idaEVolta: false,
        modo: 'frete' // Corrigido nome do campo
      })
      this.$set(this.expandedLoteItems, index, true)
    },
    
    removeLoteItem(index) {
      this.loteItems.splice(index, 1)
      this.loteErrors.splice(index, 1)
      this.$delete(this.expandedLoteItems, index)
    },
    
    toggleLoteItem(index) {
      this.$set(this.expandedLoteItems, index, !this.expandedLoteItems[index])
    },
    
    toggleResultItem(index) {
      this.$set(this.expandedResultItems, index, !this.expandedResultItems[index])
    },
    
    async simulate() {
      const errors = this.validateForm(this.individualForm)
      if (Object.keys(errors).length > 0) {
        this.formErrors = errors
        const firstError = Object.values(errors)[0]
        this.showErrorModal(firstError)
        return
      }
      
      this.loading = true
      this.simulationResult = null
      this.formErrors = {}
      
      try {
        const data = this.prepareFormData(this.individualForm)
        const response = await api.post('/api/v1/calculos/frete', data)
        this.simulationResult = response.data
      } catch (error) {
        this.showErrorModal(error.message || 'Erro ao simular viagem')
      } finally {
        this.loading = false
      }
    },
    
    async simulateLote() {
      let hasErrors = false
      this.loteErrors = []
      
      for (let i = 0; i < this.loteItems.length; i++) {
        const errors = this.validateForm(this.loteItems[i])
        this.loteErrors[i] = errors
        if (Object.keys(errors).length > 0) {
          hasErrors = true
        }
      }
      
      if (hasErrors) {
        this.showErrorModal('Por favor, corrija os erros nos formulários antes de simular')
        return
      }
      
      this.loading = true
      this.simulationResult = null
      
      try {
        const viagens = this.loteItems.map(item => this.prepareFormData(item))
        const response = await api.post('/api/v1/calculos/frete/lote', { viagens })
        this.simulationResult = response.data
        
        if (this.simulationResult.itens && this.simulationResult.itens.length > 0) {
          this.$set(this.expandedResultItems, 0, true)
        }
      } catch (error) {
        this.showErrorModal(error.message || 'Erro ao simular lote de viagens')
      } finally {
        this.loading = false
      }
    },
    
    async persist() {
      const errors = this.validateForm(this.individualForm)
      if (Object.keys(errors).length > 0) {
        this.formErrors = errors
        const firstError = Object.values(errors)[0]
        this.showErrorModal(firstError)
        return
      }
      
      this.loading = true
      this.formErrors = {}
      
      try {
        const data = this.prepareFormData(this.individualForm)
        
        if (this.isEdit) {
          await api.put(`/api/v1/trips/${this.$route.params.id}`, data)
          this.showSuccessModal('Viagem atualizada com sucesso!', () => {
            this.$router.push('/trips')
          })
        } else {
          await api.post('/api/v1/trips', data)
          this.showSuccessModal('Viagem criada com sucesso!', () => {
            this.$router.push('/trips')
          })
        }
      } catch (error) {
        this.showErrorModal(error.message || 'Erro ao salvar viagem')
      } finally {
        this.loading = false
      }
    },
    
    async persistLote() {
      let hasErrors = false
      this.loteErrors = []
      
      for (let i = 0; i < this.loteItems.length; i++) {
        const errors = this.validateForm(this.loteItems[i])
        this.loteErrors[i] = errors
        if (Object.keys(errors).length > 0) {
          hasErrors = true
        }
      }
      
      if (hasErrors) {
        this.showErrorModal('Por favor, corrija os erros nos formulários antes de salvar')
        return
      }
      
      this.loading = true
      
      try {
        const viagens = this.loteItems.map(item => this.prepareFormData(item))
        await api.post('/api/v1/trips/lote', { viagens })
        this.showSuccessModal('Lote de viagens criado com sucesso!', () => {
          this.$router.push('/trips')
        })
      } catch (error) {
        this.showErrorModal(error.message || 'Erro ao salvar lote de viagens')
      } finally {
        this.loading = false
      }
    },
    
    async recalculate() {
      if (!this.isEdit) return
      
      this.loading = true
      this.recalculateResult = null
      
      try {
        const response = await api.post(`/api/v1/trips/${this.$route.params.id}/calcular`)
        this.recalculateResult = response.data
      } catch (error) {
        this.showErrorModal(error.message || 'Erro ao recalcular viagem')
      } finally {
        this.loading = false
      }
    },
    
    switchMode(newMode) {
      if (this.mode !== newMode) {
        this.mode = newMode
        this.simulationResult = null
        this.recalculateResult = null
        this.formErrors = {}
        this.loteErrors = []
        this.expandedLoteItems = {}
        this.expandedResultItems = {}
      }
    },
    
    prepareFormData(form) {
      const baseData = {
        origem: form.origem,
        destino: form.destino,
        distanciaKm: parseNumber(form.distanciaKm),
        consumoKmPorLitro: parseNumber(form.consumoKmPorLitro),
        precoLitro: parseNumber(form.precoLitro),
        gastosAdicionais: parseNumber(form.gastosAdicionais),
        idaEVolta: form.idaEVolta
      }
      
      // Adicionar campo de preço baseado no modo escolhido usando nome correto do campo
      if (form.modo === 'frete') {
        baseData.valorFrete = parseNumber(form.valorFrete)
      } else if (form.modo === 'ganho') {
        baseData.ganhoPorKmDesejado = parseNumber(form.ganhoPorKmDesejado)
      }
      
      return baseData
    },
    
    toggleIndividualForm() {
      this.individualFormExpanded = !this.individualFormExpanded
    }
  }
}
</script>

<style scoped>
/* Aplicado tema escuro completo inspirado no Railway */
.trip-form-container {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
}

.header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-button {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-right: 16px;
}

.back-button:hover {
  background: #2a2a2a;
  color: #ffffff;
}

.header h1 {
  flex: 1;
  margin: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
}

.header-spacer {
  width: 40px;
}

.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  color: #9ca3af;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab.active {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: #ffffff;
}

.tab:not(.active):hover {
  background: #2a2a2a;
  color: #ffffff;
}

.form-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.edit-actions {
  margin-bottom: 24px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 40px;
}

.action-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 52px;
}

.action-button.primary {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
}

.action-button.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
}

.action-button.secondary {
  background: #374151;
  color: #d1d5db;
  border: 1px solid #4b5563;
}

.action-button.secondary:hover:not(:disabled) {
  background: #4b5563;
  border-color: #6b7280;
}

.action-button.success {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
}

.action-button.success:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
}

.action-button:disabled {
  background: #374151;
  color: #6b7280;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.lote-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 20px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
}

.lote-header h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: linear-gradient(135deg, #16a34a, #15803d);
  transform: translateY(-1px);
}

.lote-item {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
}

.lote-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  padding: 16px 0;
  border-bottom: 1px solid #2a2a2a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lote-item-header:hover {
  background: rgba(139, 92, 246, 0.05);
  border-radius: 8px;
  padding: 16px 12px;
  margin: 0 -12px 0 -12px;
}

/* Adicionado estilos para acordeão */
.lote-item-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-button {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-button:hover {
  background: #2a2a2a;
  color: #ffffff;
}

.toggle-button svg {
  transition: transform 0.2s ease;
}

.toggle-button svg.rotated {
  transform: rotate(180deg);
}

.lote-item-content {
  padding-top: 16px;
}

.result-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 12px 0;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.result-item-header:hover {
  background: rgba(139, 92, 246, 0.05);
  padding: 12px;
  margin: 0 -12px;
}

.result-item-content {
  padding-top: 12px;
}

/* Animações de transição para acordeão */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
}

.accordion-enter-to,
.accordion-leave {
  opacity: 1;
  max-height: 1000px;
}

.alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-weight: 500;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.totals-grid {
  display: grid;
  gap: 12px;
}

.total-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #2a2a2a;
}

.total-item.highlight {
  background: #111111;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
}

.total-item .label {
  color: #9ca3af;
}

.total-item .value {
  color: #ffffff;
  font-weight: 500;
}

.total-item.highlight .value {
  color: #8b5cf6;
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .form-actions {
    gap: 8px;
  }
  
  .lote-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}

.remove-button {
  background: #374151;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-button:hover {
  background: #4b5563;
  color: #f87171;
  transform: scale(1.05);
}

.simulation-result {
  margin-top: 32px;
}

.result-item {
  margin-bottom: 24px;
}

.totals-card {
  margin-top: 32px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 24px;
}

.totals-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

/* Adicionando estilos para o cabeçalho do acordeão individual */
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 16px;
}

.accordion-header:hover {
  border-color: #374151;
  background: #1f1f1f;
}

.accordion-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
}

.accordion-title svg {
  color: #8b5cf6;
  flex-shrink: 0;
}

.accordion-arrow {
  color: #9ca3af;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.accordion-arrow.rotated {
  transform: rotate(180deg);
}
</style>
