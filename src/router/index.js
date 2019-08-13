
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
// 导入用户信息
import store from '@/store'
// 导入素材管理
import Image from '@/views/image'
// 发布文章
import Publish from '@/views/publish'
// 评论管理
import Comment from '@/views/comment'
// 粉丝管理
import Fans from '@/views/fans'
// 配置设置路由
import Setting from '@/views/setting'

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
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '/fans',
          name: 'fans',
          component: Fans
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        }

      ]
    },
    // 此处的路径是通配路径 404
    { path: '*', name: '404', component: NotFound }
  ]
})

// 加上全局前置导航守卫
router.beforeEach((to, from, next) => {
  // // 如果是登录页面路由   放行
  // if (to.path === '/login') return next()
  // // 获取用户信息  如果没有   跳转登录
  // // store.getUser() 获取的是一个对象，即使没有内容也是个空对象
  // // 所以从该对象的token中进行判断是否有值
  // if (!store.getUser().token) return next('/login')
  // // 放行
  // next()

  // 优化上面的代码(如果不是登录页，并且没有token   则都跳转login页面)
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
