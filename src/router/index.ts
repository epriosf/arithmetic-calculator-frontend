import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('../views/auth/LoginView.vue')
    },
    {
      path: '/mathOperations',
      name: 'mathOperations',
      component: ()=> import('../views/MathOperations.vue')
    },
    {
      path: '/generatorString',
      name: 'generatorString',
      component: ()=> import('../views/GeneratorString.vue')
    },
    {
      path: '/userRecords',
      name: 'userRecords',
      component: ()=> import('../views/UserRecords.vue')
    },
  ]
})

export default router;

