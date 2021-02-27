declare global {
  interface Window {
    dataLayer: any[]
  }
}

// @ts-ignore
export const GtagID = __GTAG_ID__

export function pushGtag(...args: any[]) {
  if (!window.dataLayer) return
  window.dataLayer.push(...args)
}
