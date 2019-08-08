
// 对axios进行配置，并将配置好的 axios 导出并使用
// 引入axios
import axios from 'axios'
// 引入store 为了用于配制请求头信息
import store from '@/store'
// import { Promise } from 'fs'

// 导入json-BigInt包    解决数字最大安全值的问题
import JSONBIG from 'json-bigint'

// 进行配置(基准路径)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置请求头
// axios.defaults.header = {
//   Authorization: `Bearer ${store.getUser().token}`
// }

// 导出响应回来的数字  进行最大值的修改
axios.defaults.transformResponse = [(data) => {
  // 对data进行转换   data为原始json字符   return 返回转化后的结果
  // 如果data 在删除接口返回的是 null  使用JSONBIG转换 null 会报错
  try { return JSONBIG.parse(data) } catch (e) {
    return data
  }
}]

axios.interceptors.request.use((config) => {
  // 修改  在每次请求前  获取一次 token 头部
  //   config.header = {
  //     Authorization: `Bearer ${store.getUser().token}`
  //   }
  // 好处：不会覆盖之前的头部信息
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  // 请求出项异常   走这个函数

  // promises.reject(err)   一个失败的 promises 对象
  // promise.resolve(success)   一个成功的 promise 对象
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  // 成功的返回值 默认包装成promise对象
  return res
}, (err) => {
  // 获取响应状态码
  // err 错误对象
  // err.response 响应对象
  // err.response.status 响应状态码
  if (err.response.status === 401) {
    // token失效  跳转登录页面
    // this.$router.push('/login')  本质  把hash改成了 #/login
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
// 导出axios
export default axios
