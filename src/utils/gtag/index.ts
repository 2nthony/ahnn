declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const GtagID = 'G-2VZ9TX13ZG'

export function pushGtag(...args: any[]) {
  if (!window.dataLayer) return
  window.dataLayer.push(...args)
}
