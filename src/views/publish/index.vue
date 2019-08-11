<template>
  <div class="articel-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articelForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本插件 -->
          <quill-editor v-model="articelForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articelForm.cover.type" @change="changeType()">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 使用选择图片组件 -->
          <!-- <my-image v-model="articelForm.cover.images"></my-image> -->
          <div v-if="articelForm.cover.type===1">
            <my-image v-model="articelForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articelForm.cover.type===3">
            <my-image v-model="articelForm.cover.images[0]"></my-image>
            <my-image v-model="articelForm.cover.images[1]"></my-image>
            <my-image v-model="articelForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articelForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入富文本组件
import { quillEditor } from 'vue-quill-editor'
export default {
  // 富文本组件
  components: {
    quillEditor
  },
  data () {
    return {
      articelForm: {
        title: '',
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      // 地址栏的文章id
      articleId: null
    }
  },
  created () {
    // 获取该页面的id(进行判断是进行存入草稿还是发表文章)
    this.articleId = this.$route.query.id
    // 如果id在地址栏中存储   代表是修改逻辑    才有必要获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    // 获取文章数据
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
      this.articelForm = data
    },
    // 发表或者存入草稿
    async submit (draft) {
      // 发请求
      await this.$http.post(`articles?draft=${draft}`, this.articelForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 跳转内容管理
      this.$router.push('/article')
    },
    // 切换封面类型，重置图片数据
    changeType () {
      this.articelForm.cover.images = []
    },
    // 修改或者存入草稿
    async update (draft) {
      // 发请求
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articelForm)
      // 提示
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      // 跳转内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang="less">
</style>
