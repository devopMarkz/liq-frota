export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00'
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return '0,00'
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export const formatDateTime = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Converte string brasileira para número (5,99 -> 5.99)
export const parseNumber = (value) => {
  if (typeof value === 'number') return value
  if (!value) return 0
  
  return parseFloat(value.toString().replace(',', '.')) || 0
}

// Converte número para string brasileira (5.99 -> 5,99)
export const formatNumberInput = (value) => {
  if (value === null || value === undefined) return ''
  return value.toString().replace('.', ',')
}