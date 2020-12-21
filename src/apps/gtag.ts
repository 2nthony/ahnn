import { pushGtag, GtagID } from '../utils/gtag'

const script = document.createElement('script')
script.async = true
script.src = `https://www.googletagmanager.com/gtag/js?id=${GtagID}`
document.body.append(script)

window.dataLayer = window.dataLayer || []

pushGtag('js', new Date())
