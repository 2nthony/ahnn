import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-auto-routes'
import { pushGtag, GtagID } from './utils/gtag'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach(() => {
  pushGtag('config', GtagID)
})
