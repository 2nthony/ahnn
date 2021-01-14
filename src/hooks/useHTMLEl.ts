import { ref } from 'vue'

export function useHTMLEl<T = HTMLElement>() {
  const el = ref<T | null>(null)
  return { el }
}
