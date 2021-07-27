import { Appreance, Appreances } from '@app/model/Preference'
import { isDarkMode, preferMediaDark } from '..'

export function switchAppreance(appreance: Appreance) {
  switch (appreance) {
    case Appreances.auto: {
      doAuto(isDarkMode)
      preferMediaDark.addEventListener('change', (e) => doAuto(e.matches))

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

function doAuto(isDark: boolean) {
  if (isDark) doHTMLDarkTheme('add')
  else doHTMLDarkTheme('remove')
}
