
// 初始化路有对象  ，提供 main.js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入进去login
import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 跳转路由 $router.push('/login') 或者 $router.push({ name: 'login' })
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
