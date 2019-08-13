// 封装操作 sesseionStorage 的函数，   提供给其他模板使用
// 约定好 key 的名字
// 约定好 value 的格式    字符串格式   JSON格式的数据

const KEY = 'hm-toutao-78-user'

// 暴露几个方式供全局使用
export default {
  //   设置用户信息
  setUser (user) {
    // 设置存储用户信息

    // 现在是给什么传什么  完整替换之前的信息
    // 预期给一个字段    就局部修改这个字段即可
    // 做法：获取本地存储的对象  把传入的对象  合并覆盖到当时存储的对象
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  // 获取用户信息
  getUser () {
    //   当拿到空对象时，使用 “或” 出来一下
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
