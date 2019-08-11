<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框组 -->
          <el-radio-group v-model="reqParams.collect" size="mini" @change="changeCollect">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImageUrl=item.url"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页列表 -->
          <el-pagination
            v-if="total > reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片组件 -->
          <el-upload
            name="image"
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 对话框的显示隐藏
      dialogVisible: false,
      // 控制tab选项卡到底激活谁
      activeName: 'image',
      // 获取素材列表请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 列表数据
      images: [],
      // 总页码
      total: 0,
      // 记录选中图片的地址
      selectedImageUrl: null,
      // 上传头部
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 上传图片的路径
      uploadImageUrl: null,
      // 封面地址
      // value: defaultImage
      defaultImage
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      // 关闭对话框
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess (res) {
      // 预览即可
      this.uploadImageUrl = res.data.url
    },
    // 分页切换功能
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换全部与收藏方法
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // // 双击事件
    // openImage () {
    //   this.dialogVisible = true
    //   this.activeName = 'image'
    //   this.selectedImageUrl = null
    //   this.uploadImageUrl = null
    // },
    openDialog () {
      this.dialogVisible = true
      // 打开时默认选中素材库
      this.activeName = 'image'
      // // 再次打开清空之前的图片地址
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      // 打开方法后拿数据     获取列表数据
      this.getImages()
    },
    // 刷新渲染列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 将数据传给images
      this.images = data.results
      // 获取分页总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  display: block;
}
.img-list {
  margin-top: 10px;
  .img-item {
    display: inline-block;
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    margin-right: 15px;
    margin-bottom: 10px;
    position: relative;

    // 给图片添加一个伪元素
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      // 调整img里面图片的平铺方式
      object-fit: contain;
    }
  }
}
</style>
