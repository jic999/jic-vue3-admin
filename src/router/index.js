import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes, dynamicRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...dynamicRoutes],
})

export default router
