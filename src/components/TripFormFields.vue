<template>
  <div class="trip-form-fields">
    <div class="form-grid">
      <div class="form-group">
        <label for="origem">
          <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="currentColor"/>
          </svg>
          Origem *
        </label>
        <input
          id="origem"
          v-model="localValue.origem"
          type="text"
          placeholder="Ex.: São Luís, MA"
          class="form-input"
          :class="{ error: errors.origem }"
          @input="updateValue"
        />
        <span v-if="errors.origem" class="error-text">{{ errors.origem }}</span>
      </div>
      
      <div class="form-group">
        <label for="destino">
          <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="currentColor"/>
          </svg>
          Destino *
        </label>
        <input
          id="destino"
          v-model="localValue.destino"
          type="text"
          placeholder="Ex.: Teresina, PI"
          class="form-input"
          :class="{ error: errors.destino }"
          @input="updateValue"
        />
        <span v-if="errors.destino" class="error-text">{{ errors.destino }}</span>
      </div>
    </div>
    
    <div class="form-grid">
      <div class="form-group">
        <label for="distancia">
          <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="currentColor"/>
          </svg>
          Distância (km) *
        </label>
        <input
          id="distancia"
          v-model="localValue.distanciaKm"
          type="text"
          inputmode="decimal"
          placeholder="Ex.: 430,00"
          class="form-input"
          :class="{ error: errors.distanciaKm }"
          @input="handleNumericInput('distanciaKm', $event)"
        />
        <span v-if="errors.distanciaKm" class="error-text">{{ errors.distanciaKm }}</span>
      </div>
      
      <div class="form-group">
        <label for="consumo">
          <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19.77 7.23L19.78 7.22L16.06 3.5L15 4.56L17.11 6.67C16.17 7.03 15.5 7.93 15.5 9C15.5 10.38 16.62 11.5 18 11.5S20.5 10.38 20.5 9C20.5 8.31 20.22 7.68 19.77 7.23ZM18 10.5C17.17 10.5 16.5 9.83 16.5 9S17.17 7.5 18 7.5S19.5 8.17 19.5 9S18.83 10.5 18 10.5Z" fill="currentColor"/>
            <path d="M12.5 16.5C12.5 17.88 11.38 19 10 19S7.5 17.88 7.5 16.5S8.62 14 10 14S12.5 15.12 12.5 16.5Z" fill="currentColor"/>
          </svg>
          Consumo (km/L) *
        </label>
        <input
          id="consumo"
          v-model="localValue.consumoKmPorLitro"
          type="text"
          inputmode="decimal"
          placeholder="Ex.: 12,5"
          class="form-input"
          :class="{ error: errors.consumoKmPorLitro }"
          @input="handleNumericInput('consumoKmPorLitro', $event)"
        />
        <span v-if="errors.consumoKmPorLitro" class="error-text">{{ errors.consumoKmPorLitro }}</span>
      </div>
    </div>
    
    <div class="form-grid">
      <div class="form-group">
        <label for="preco">
          <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z" fill="currentColor"/>
          </svg>
          Preço Litro (R$) *
        </label>
        <input
          id="preco"
          v-model="localValue.precoLitro"
          type="text"
          inputmode="decimal"
          placeholder="Ex.: 5,99"
          class="form-input"
          :class="{ error: errors.precoLitro }"
          @input="handleNumericInput('precoLitro', $event)"
        />
        <span v-if="errors.precoLitro" class="error-text">{{ errors.precoLitro }}</span>
      </div>
      
      <div class="form-group">
        <label for="gastos">
          <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
          Gastos Adicionais (R$) *
        </label>
        <input
          id="gastos"
          v-model="localValue.gastosAdicionais"
          type="text"
          inputmode="decimal"
          placeholder="Ex.: 50,00"
          class="form-input"
          :class="{ error: errors.gastosAdicionais }"
          @input="handleNumericInput('gastosAdicionais', $event)"
        />
        <span v-if="errors.gastosAdicionais" class="error-text">{{ errors.gastosAdicionais }}</span>
      </div>
    </div>
    
    <div class="form-group">
      <label class="pricing-mode-label">Como quer informar o preço?</label>
      <div class="pricing-mode-toggle">
        <label class="toggle-option" :class="{ active: localValue.modo === 'frete' }">
          <input
            type="radio"
            value="frete"
            v-model="localValue.modo"
            @change="handleModeChange"
            class="toggle-radio"
          />
          <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.5 11.8 10.9Z" fill="currentColor"/>
          </svg>
          <span>Valor do frete (R$)</span>
        </label>
        
        <label class="toggle-option" :class="{ active: localValue.modo === 'ganho' }">
          <input
            type="radio"
            value="ganho"
            v-model="localValue.modo"
            @change="handleModeChange"
            class="toggle-radio"
          />
          <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
          </svg>
          <span>Ganho por km (R$/km)</span>
        </label>
      </div>
    </div>
    
    <div class="form-group" v-if="localValue.modo === 'frete'">
      <label for="valor">
        <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.5 11.8 10.9Z" fill="currentColor"/>
        </svg>
        Valor do Frete (R$) *
      </label>
      <input
        id="valor"
        v-model="localValue.valorFrete"
        type="text"
        inputmode="decimal"
        placeholder="Ex.: 900,00"
        class="form-input"
        :class="{ error: errors.valorFrete }"
        @input="handleNumericInput('valorFrete', $event)"
      />
      <span v-if="errors.valorFrete" class="error-text">{{ errors.valorFrete }}</span>
    </div>
    
    <div class="form-group" v-if="localValue.modo === 'ganho'">
      <label for="ganho">
        <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
          </svg>
        Ganho por km (R$/km) *
      </label>
      <input
        id="ganho"
        v-model="localValue.ganhoPorKmDesejado"
        type="text"
        inputmode="decimal"
        placeholder="Ex.: 1,20"
        class="form-input"
        :class="{ error: errors.ganhoPorKmDesejado }"
        @input="handleNumericInput('ganhoPorKmDesejado', $event)"
      />
      <span v-if="errors.ganhoPorKmDesejado" class="error-text">{{ errors.ganhoPorKmDesejado }}</span>
    </div>
    
    <div class="form-group checkbox-group">
      <label class="checkbox-label">
        <input
          v-model="localValue.idaEVolta"
          type="checkbox"
          class="form-checkbox"
          @change="updateValue"
        />
        <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
        <span class="checkbox-text">Ida e Volta</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripFormFields',
  props: {
    value: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localValue: { 
        ...this.value,
        modo: this.value.modo || 'frete'
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.localValue = { 
          ...newValue,
          modo: newValue.modo || 'frete'
        }
      },
      deep: true
    }
  },
  methods: {
    handleNumericInput(field, event) {
      const value = event.target.value
      const numericValue = value.replace(/[^0-9.,]/g, '')
      this.localValue[field] = numericValue
      event.target.value = numericValue
      this.updateValue()
    },
    
    handleModeChange() {
      if (this.localValue.modo === 'frete') {
        this.localValue.ganhoPorKmDesejado = ''
      } else {
        this.localValue.valorFrete = ''
      }
      this.updateValue()
    },
    
    updateValue() {
      this.$emit('input', { ...this.localValue })
    }
  }
}
</script>

<style scoped>
.trip-form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: flex;
  align-items: center;
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.input-icon {
  margin-right: 8px;
  color: #9ca3af;
}

.form-input {
  background: #111111;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 12px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-input::placeholder {
  color: #6b7280;
}

.form-input.error {
  border-color: #ef4444;
}

.error-text {
  margin-top: 4px;
  color: #ef4444;
  font-size: 12px;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 0;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #8b5cf6;
}

.checkbox-text {
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
}

.pricing-mode-label {
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  display: block;
}

.pricing-mode-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.toggle-option {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #111111;
  border: 1px solid #374151;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0;
}

.toggle-option:hover {
  border-color: #4b5563;
  background: #1f1f1f;
}

.toggle-option.active {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
}

.toggle-radio {
  display: none;
}

.toggle-icon {
  color: #9ca3af;
  flex-shrink: 0;
}

.toggle-option.active .toggle-icon {
  color: #8b5cf6;
}

.toggle-option span {
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
}

.toggle-option.active span {
  color: #ffffff;
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-mode-toggle {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
