<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" />

      <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
        <!-- 手机号输入框 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- :value="true"  默认选中 -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验规则函数
    const checkMobile = (rule, value, callback) => {
      // 按照自己的逻辑去校验
      // 使用正则表达式进行手机号码的验证   第一位数是1    第二位数：3-9  后面是随机数字，共9位
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不对'))
      }
      callback()
      // if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机格式不对'))
      // callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        // 字段参考接口文档
        mobile: '18735624049',
        code: '246810'
      },
      // 基础校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入你的手机号', trigger: 'blur' },
          { validator: checkMobile, triggle: 'blur' }
        ],
        code: [
          {
            required: true,
            message: '请输入您的验证码',
            trigger: 'blur'
          },
          {
            len: 6,
            message: '请输入6位数的验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 如果校验成功，发起登录的请求
          console.log('success')
          // 使用axios进行发送请求
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // res是响应对象   res.data是数据属于响应对象
              // console.log(res.data)
              // 验证正确，跳转首页
              this.$router.push('/')
            })
            .catch(() => {
              // 请求失败的发送错误提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  //   center / cover  背景定位  /  背景图尺寸   cover 等比缩放（多余内容被裁减）  contain 等比缩放完全显示在整个容器中，容易出现留白
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.box-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    width: 200px;
    display: block;
    margin: 0 auto 20px;
  }
}
</style>
