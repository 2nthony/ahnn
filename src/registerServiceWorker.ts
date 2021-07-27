import { register } from 'register-service-worker'
import { createToast } from 'vercel-toast'
import 'vercel-toast/dist/vercel-toast.css'
import { isDarkMode } from './utils'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    updated(registration) {
      const worker = registration.waiting
      if (!worker) return

      // skip waiting
      worker.postMessage({ type: 'SKIP_WAITING' })
      createToast('新版本已可用', {
        type: isDarkMode ? 'dark' : 'default',
        action: {
          text: '刷新',
          callback() {
            window.location.reload()
          },
        },
      })
    },
  })
}
