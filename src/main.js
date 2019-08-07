import Vue from 'vue'
import App from './App.vue'

// 引入element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入 vue-router
// import router from './router/index.js'
// @是一个路径的别名  是 src 路径的别名
// index 是目录的索引未文件   默认使用索引文件
import router from '@/router'

// 导入公共样式文件
import '@/styles/index.less'

// 引入axios
// import axios from 'axios'
// 挂载配置好的axios
import axios from '@/api'

// 引入 components 文件
import myPlugin from '@/components'
// 使用注册的 components 插件
Vue.use(myPlugin)

// 全局挂载axiso
Vue.prototype.$http = axios

// 是否开启产品级别提示  不开启   开发阶段  提示越详细越好  开发级别提示
Vue.config.productionTip = false
// 使用element - ui
Vue.use(ElementUI)

// main.js是入口文件
// 职责1：引入需要依赖的模块（js,包，css,其他模块）
// 职责2：创建一个 vue 根实例
new Vue({
  router,
  // 是一个Vue配置项，指向的是函数
  // render 的优先级最高   相比 el  template
  render: h => h(App)
  // render: function (createElement) {
  //   return createElement(App)
  // }
}).$mount('#app') // 把 render 的内容挂载到那个容器中
