import axios from 'axios'
import store from '@/store'
import router from '@/router'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = store.getters['auth/token']
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      store.dispatch('auth/logout')
      router.push('/login')
      return Promise.reject(new Error('Sessão expirada ou inválida'))
    }
    
    // Extrair mensagens de erro do backend
    if (error.response?.data?.erros) {
      const errorMessage = error.response.data.erros.join(', ')
      return Promise.reject(new Error(errorMessage))
    }
    
    return Promise.reject(error)
  }
)

export default api