import axios from 'axios'
import store from '../store'
import { toast } from 'react-toastify'
import { authConstants } from '../redux/actions/constants'

// toast.configure()

const token = window.localStorage.getItem('token')

const axiosIntance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
})

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState()
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`
  }
  return req
})

axiosIntance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      toast.success(res.data.message)
    } else {
      if(res.data.show === false){

      }else{
        toast.error(res.data.message)
      }
    }
    return res
  },
  (error) => {
    toast.error(error.response.data.message)
    const status = error.response ? error.response.status : 500
    if (status && status === 500) {
      // localStorage.clear()
      // store.dispatch({ type: authConstants.LOGOUT_SUCCESS })
    }
    return Promise.reject(error)
  },
)

export default axiosIntance