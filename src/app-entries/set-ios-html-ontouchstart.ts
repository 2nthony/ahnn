import { isIOS } from '@app/utils/platform'

if (isIOS) {
  document.documentElement.setAttribute('ontouchstart', '')
}
