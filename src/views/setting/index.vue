<template>
  <div class="setting-container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <div>
            <!-- 表单 -->
            <el-form label-width="120px">
              <el-form-item label="编号：">{{userForm.id}}</el-form-item>
              <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
              <el-form-item label="媒体名称：">
                <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍：">
                <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input v-model="userForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :http-request="myUpload"
            >
              <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center;font-size:14px">保存设置</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        email: null,
        ptoto: null,
        mobile: null
      },
      imageUrl: null
    }
  },
  created () {
    //   获取个人用户信息
    this.getUserInfo()
  },
  methods: {
    //   自定义上传
    myUpload (result) {
      // 选择图片   执行当前函数
      // 使用axios 和 formData 提交图片
      console.log(result)
      const formdata = new FormData()
      formdata.append('photo', result.file)
      // 发送请求
      this.$http.patch('user/photo', formdata).then(res => {
        //  上传成功       res是相应对象
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 更新本地存储
        store.setUser({ photo: this.userForm.photo })
        //  更新home头像
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    //   保存用户信息
    async saveUserInfo () {
      // patch 是修改的时候使用的请求方式  局部修改
      // put 是修改的时候使用的请求方式  完整修改
      //   const {
      //     data: { data }
      //   } =
      await this.$http.patch('user/profile', {
        // 严格按照后台数据进行传参
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      //   提示
      this.$message.success('保存设置成功')
      //   用户名更新到本地存储里面
      store.setUser({ name: this.userForm.name })
      // 更新home 组件的用户名
      eventBus.$emit('updateName', this.userForm.name)

      //   //  5秒重定向至首页
      //   window.setTimeout(() => {
      //     this.$router.push('/')
      //   }, 5000)
    },
    // 获取个人设置的信息
    async getUserInfo () {
      // 此时获取的用户数据    和     本地保存的用户数据不一致
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    }
  }
}
</script>

<style scope lang="less">
</style>
