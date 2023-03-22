import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes, dynamicRoutes } from './routes'

import { createGuard } from './routes.guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...dynamicRoutes],
})

createGuard(router)

export default router
