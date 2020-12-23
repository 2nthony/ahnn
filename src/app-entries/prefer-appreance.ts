import { isDarkMode } from '@/utils'
import { doHTMLDarkTheme } from '@/utils/preference/switchAppreance'

if (isDarkMode) {
  doHTMLDarkTheme('add')
} else {
  doHTMLDarkTheme('remove')
}
