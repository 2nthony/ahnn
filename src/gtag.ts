interface Window {
  dataLayer: any[]
}

const ID = 'G-2VZ9TX13ZG'

const script = document.createElement('script')
script.async = true
script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
document.body.append(script)

window.dataLayer = window.dataLayer || []

gtag('js', new Date())

function gtag(...args: any[]) {
  window.dataLayer.push(...args)
}
