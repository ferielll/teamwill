// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard'),
    meta: { requiresAuth: true },
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
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products')
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import('@/views/Customer')
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: () => import('@/views/suppliers')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});




const store = useStore();
console.log(store);

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     if (!store.state.authenticated) {
//       next({ name: 'Login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });


export default router
