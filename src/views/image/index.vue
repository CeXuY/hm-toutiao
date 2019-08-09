<template>
  <div class="containter">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 中部  单选框式组合按钮  按钮 -->
      <el-radio-group v-model="reqParams.collect" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 图片 -->
      <el-button type="success" size="small" style="float:right">添加素材</el-button>
      <div class="img-list">
        <div class="img-item" v-for="item in 10" :key="item">
          <img src="../../assets/images/avatar.jpg" alt />
          <div class="footer">
            <span class="el-icon-star-off selected"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页组件 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      }
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
