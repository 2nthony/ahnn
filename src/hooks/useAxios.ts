import { ref } from 'vue'
import Axios from 'axios'

export function useAxios() {
  const loading = ref(false)

  const axios = Axios.create()
  axios.interceptors.request.use(
    (req) => {
      loading.value = true
      return req
    },
    (error) => {
      loading.value = false
      return Promise.reject(error)
    },
  )
  axios.interceptors.response.use(
    (res) => {
      loading.value = false
      return res
    },
    (error) => {
      loading.value = false
      return Promise.reject(error)
    },
  )

  return {
    axios,
    loading,
  }
}
