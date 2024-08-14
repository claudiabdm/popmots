import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/study',
      name: 'study',
      component: () => import('@/views/StudyView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/StudyView.vue'),
    }
  ]
})

export default router
