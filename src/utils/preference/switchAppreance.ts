import { Appreance, Appreances } from '@app/model/Preference'
import { isDarkMode } from '..'

export function switchAppreance(appreance: Appreance) {
  switch (appreance) {
    case Appreances.auto: {
      if (isDarkMode) {
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

export function doHTMLDarkTheme(action: 'add' | 'remove') {
  document.documentElement.classList[action]('dark-theme')
}
