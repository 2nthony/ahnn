import { useRouter } from 'vue-router'

declare var window: { dataLayer: any[] }

const ID = 'G-2VZ9TX13ZG'

export function ensureGtagScript() {
  if (window.dataLayer) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  document.body.append(script)

  window.dataLayer = window.dataLayer || []

  gtag('js', new Date())
}

export function setupGtag() {
  if (process.env.NODE_ENV !== 'production') return
  const router = useRouter()
  router.afterEach(() => {
    ensureGtagScript()
    gtag('config', ID)
  })
}

function gtag(...args: any[]) {
  window.dataLayer.push(...args)
}
