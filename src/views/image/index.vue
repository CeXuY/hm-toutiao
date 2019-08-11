<template>
  <div class="containter">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 中部  单选框式组合按钮  按钮 -->
      <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 图片 -->
      <el-button @click="openDialog" type="success" size="small" style="float:right">添加素材</el-button>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-show="!reqParams.collect">
            <span
              @click="toggleCollect(item)"
              class="el-icon-star-off"
              :class="{selected:item.is_collected}"
            ></span>
            <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页组件 -->
      <el-pagination
        v-if="total > reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传图片组件 -->
      <!-- 不是使用axios 所以需要使用完整路径 -->
      <!-- name 提交给后台的文件的字段名称 -->
      <el-upload
        name="image"
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 申明一个素材列表
      images: [],
      // 总条数
      total: 0,
      // 控制对话框的显示与隐藏
      dialogVisible: false,
      // 上传成功后图片的地址
      imageUrl: null,
      //
      headers: {
        // 请求头设置为token值
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    // 获取素材列表
    this.getImage()
  },
  methods: {
    // 删除方法
    deleteImage (id) {
      // 加入一个删除框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete('user/images/' + id)
          this.$message.success('删除成功')
          this.getImage()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 切换收藏
    async toggleCollect (item) {
      // 切换需要发送请求
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏')
      // 更新当前图片的状态
      item.is_collected = data.collect
    },
    // 上传成功提示
    handleSuccess (res) {
      // 获取上传成功后的图片地址
      // 预览
      this.imageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
      // 关闭对话框
      window.setTimeout(() => {
        this.dialogVisible = false
        // 上传完毕后显示在第一页
        this.reqParams.page = 1
        this.getImage()
      }, 2000)
      // 更新列表
    },
    // 打开对话框
    openDialog () {
      // 再次打开预览框内容显示为空
      this.imageUrl = null
      this.dialogVisible = true
    },
    // 改变全部与收藏的方法
    changeCollect () {
      // 数据发生修改，将页码跳转第一页
      this.reqParams.page = 1
      // 重新获取列表
      this.getImage()
    },
    // 分页函数
    changePage (newpage) {
      this.reqParams.page = newpage
      this.getImage()
    },
    async getImage () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给素材列表
      this.images = data.results
      // 总条数赋值
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  margin-top: 20px;
}
.img-item {
  display: inline-block;
  width: 160px;
  height: 160px;
  position: relative;
  border: 1px dashed #ddd;
  margin-right: 50px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    width: 100%;
    span {
      margin: auto 30px;
      &.selected {
        color: red;
      }
    }
  }
}
</style>
