import { Appreance, Appreances } from '@/model/Preference'

export function switchAppreance(appreance: Appreance) {
  switch (appreance) {
    case Appreances.auto: {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        doHTMLDarkTheme('add')
      } else {
        doHTMLDarkTheme('remove')
      }
      break
    }
    case Appreances.light: {
      doHTMLDarkTheme('remove')
      break
    }
    case Appreances.dark: {
      doHTMLDarkTheme('add')
      break
    }
  }
}

function doHTMLDarkTheme(action: 'add' | 'remove') {
  document.documentElement.classList[action]('dark-theme')
}
