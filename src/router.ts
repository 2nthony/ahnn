import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-auto-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
