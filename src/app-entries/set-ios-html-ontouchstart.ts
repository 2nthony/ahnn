import { isIOS } from '@/utils/platform'

if (isIOS) {
  document.documentElement.setAttribute('ontouchstart', '')
}
