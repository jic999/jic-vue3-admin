// 引入 axios
import axios from 'axios'

const req = axios.create({
  // 配置基础路径
  baseURL: 'http://localhost:8010',
  timeout: 5000,
  // 请求头
  /* headers:{} */
})
req.defaults.withCredentials = true
// 请求拦截器拦截器
req.interceptors.request.use((config) => {
  // 请求带token
  /* config.headers.Authorization = window.sessionStorage.getItem('token') */
  return config
})

// 响应拦截器
req.interceptors.response.use(
  (res) => {
    // 请求成功的回调函数
    return res.data
  },
  () => {
    // 请求失败的回调函数
    return Promise.reject('fail')
  }
)

export default req
