import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-auto-routes'

declare var window: { dataLayer: any }

const ID = 'G-2VZ9TX13ZG'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach(() => gtag('config', ID))

function gtag(...args: any[]) {
  window.dataLayer.push(...args)
}
