// 封装一个 vue 插件
// 作用：注册 components下的所有组件为全局组件
import MyBread from '@/components/my-bread'
import MyText from '@/components/my-text'

// vue 插件定义的规则： 暴露一个对象 { } 在对象中选项 install 对应一个函数   函数形参是Vue对象
export default {
  install (Vue) {
    // Vue.use(使用插件)  Vue 就是 use 前的 Vue
    // Vue 全局注册即可
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyText.name, MyText)
  }

}
