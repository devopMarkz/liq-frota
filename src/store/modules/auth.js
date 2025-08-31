import api from '@/plugins/axios'

const state = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  expiresAt: localStorage.getItem('expiresAt') || null,
  isAuthenticated: !!localStorage.getItem('token')
}

const getters = {
  token: state => state.token,
  role: state => state.role,
  isAuthenticated: state => state.isAuthenticated,
  isTokenExpired: state => {
    if (!state.expiresAt) return true
    return new Date() >= new Date(state.expiresAt)
  }
}

const mutations = {
  SET_AUTH_DATA(state, { token, role, expiresAt }) {
    state.token = token
    state.role = role
    state.expiresAt = expiresAt
    state.isAuthenticated = true
    
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('expiresAt', expiresAt)
  },
  
  CLEAR_AUTH_DATA(state) {
    state.token = null
    state.role = null
    state.expiresAt = null
    state.isAuthenticated = false
    
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('expiresAt')
  }
}

const actions = {
  async login({ commit }, { username, senha }) {
    const response = await api.post('/auth/login', { username, senha })
    const { access_token, role, expires_in } = response.data
    
    commit('SET_AUTH_DATA', {
      token: access_token,
      role,
      expiresAt: expires_in
    })
    
    return response.data
  },
  
  logout({ commit }) {
    commit('CLEAR_AUTH_DATA')
  },
  
  checkTokenExpiration({ dispatch, getters }) {
    if (getters.isTokenExpired) {
      dispatch('logout')
      return false
    }
    return true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}