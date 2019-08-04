
// 初始化路有对象  ，提供 main.js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入进去login
import Login from '@/views/login'
// 导入home路由
import Home from '@/views/home'
// 引入welcome页面
import Welcome from '@/views/welcome'
// 挂载文章列表的路由
import Article from '@/views/article'
// 挂载错误组件 404
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 跳转路由 $router.push('/login') 或者 $router.push({ name: 'login' })
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 首页路由配置
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   redirect: '/welcome',
    //   children: [{
    //     path: '/welcome',
    //     name: 'welcome',
    //     component: Welcome
    //   }]
    // }
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        }
      ]
    },
    // 此处的路径是通配路径 404
    { path: '*', name: '404', component: NotFound }
  ]
})

export default router
