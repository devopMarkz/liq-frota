import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/trips'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/trips',
    name: 'TripsList',
    component: () => import('@/views/TripsList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/trips/new',
    name: 'TripForm',
    component: () => import('@/views/TripForm.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/trips/:id/edit',
    name: 'TripEdit',
    component: () => import('@/views/TripForm.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/Reports.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Guard de autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const tokenExpired = store.getters['auth/isTokenExpired']
  
  if (tokenExpired && isAuthenticated) {
    store.dispatch('auth/logout')
  }
  
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/login')
  } else if (to.meta.requiresGuest && store.getters['auth/isAuthenticated']) {
    next('/trips')
  } else {
    next()
  }
})

export default router