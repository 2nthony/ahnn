declare module 'vue-auto-routes' {
  import type { RouteRecordRaw } from 'vue-router'
  const routes: RouteRecordRaw[]
  export { routes }
}

declare module '*.svg' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@modules/frappe-charts/css/charts.less' {
  export default any
}

declare module '@modules/frappe-charts' {
  import { Chart } from '../modules/frappe-charts'
  export { Chart }
}
