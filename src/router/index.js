// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders')
  },
  {
    path: '/shipments',
    name: 'Shipments',
    component: () => import('@/views/Shipments')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
