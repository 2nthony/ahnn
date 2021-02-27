declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const GtagID = process.env.GTAG_ID

export function pushGtag(...args: any[]) {
  if (!window.dataLayer) return
  window.dataLayer.push(...args)
}
