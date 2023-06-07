import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

type CustomRoute = RouteLocationNormalized & {
  meta?: {
    requiresAuth?: boolean
    requiresGuest?: boolean
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      alias: '/',
      meta: { requiresGuest: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/mathOperations',
      name: 'mathOperations',
      component: () => import('../views/MathOperations.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/generatorString',
      name: 'generatorString',
      component: () => import('../views/GeneratorString.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/userRecords',
      name: 'userRecords',
      component: () => import('../views/UserRecords.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:notFound(.*)',
      component: ()=> import('../components/NotFound.vue')
    }
  ]
})
router.beforeEach(async (to: CustomRoute, from, next: NavigationGuardNext) => {
  const store = useAuthStore()
  if (to.meta?.requiresAuth && !store.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && store.isAuthenticated) {
    return next({ name: 'home' })
  } else {
    return next()
  }
})

export default router
