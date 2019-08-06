<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo    isCollapse  为false,加上nimilogo ;  为true,m默认为  展开状态     -->
      <div class="logo" :class="{minilogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <!-- default-active="2"  默认激活的菜单项   指定的其实就是菜单项的index属性的值
      background-color="#545c64"   自定义的背景颜色
      active-text-color="#ffd04b"   激活时候的文本颜色
      属性控制： :collapse="isCollapse"  展开 isCollapse:false   收起 isCollapse：true
      -->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document-checked"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-document"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-user"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggle"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img src="photo" alt />
            <!-- 天空火花带闪电 -->
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-lock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 由于用户信息存在sessionStorage中，故需要引入store 模块
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  // 在组件创建时需要取数据
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    // 切换侧边栏   收起与展开
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    // click绑定的是原生的DOM事件   绑在组件上面会认为是自定义事件
    // click 可以绑定在组件解析后的DOM上面   需要使用事件修饰符   prevent   native:绑定原生事件
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 清除用户信息（在本地存储中设置删除sessionStorage中的token信息）
      store.removeUser()
      // 路径调换
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped lang="less">
// 组建的名称就是解析后的组件容器的类名
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
      140px auto;
  }
  .minilogo {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
  .el-aside {
    background-color: #002033;
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: bold;
      }
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        line-height: 60px;
      }
    }
  }
}
</style>
