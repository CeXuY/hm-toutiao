// 封装操作 sesseionStorage 的函数，   提供给其他模板使用
// 约定好 key 的名字
// 约定好 value 的格式    字符串格式   JSON格式的数据

const KEY = 'hm-toutao-78-user'

// 暴露几个方式供全局使用
export default {
  //   设置用户信息
  setUser (user) {
    // 设置存储用户信息
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  getUser () {
    //   当拿到空对象时，使用 “或” 出来一下
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}
