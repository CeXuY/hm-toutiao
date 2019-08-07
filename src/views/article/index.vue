<template>
  <div class="container">
    <!-- 筛选区域 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParmams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParmams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 0 条数据</div>
      <!-- 表格组件 -->
      <!-- data="articles"  绑定文章列表数据 -->
      <el-table :data="articels">
        <!-- el-table-column 列组件 -->
        <!-- prop="date" 指定当前的每一行显示的数据的字段的名称 -->
        <!-- label="日期"  label： 表头 -->
        <el-table-column prop="id" label="编号"></el-table-column>
        <!-- <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>-->
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center; margin-top:30px">
        <!-- layout="prev, pager, next"   layout:布局  prev:上一页按钮  pager:中间的按钮   next：下一页的按钮 -->
        <el-pagination background layout="prev, pager, next, total" :total="1000"></el-pagination>
      </div>
    </el-card>
    <!-- 测试区域 -->
    <!-- <my-text> -->
    <!-- slot="content" 指定插槽的名称 -->
    <!-- slot-scope="scope" 指定接收插槽 传递过来的所有的自定义属性和值的集合数据（对象 { msg:值 } ） -->
    <!-- 原始写法： -->
    <!-- <div slot="content" slot-scope="scope">content 获取组件内的数据： {{scope.msg}} </div> -->
    <!-- 2.6.0后支持的写法 -->
    <!-- <template v-slot:content="scope">content 获取组件内的数据： {{scope.msg}}</template>
      <div slot="footer">footer</div>
    </my-text>-->
  </div>
</template>

<script>
// 引入组件(测试使用)
// import MyText from '@/components/my-text'
// import MyBread from '@/components/my-bread'
export default {
  // 测试用
  // components: { MyText, MyBread },
  data () {
    return {
      // 收集请求参数 （表单数据）
      reqParmams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道下拉选项
      channelOptions: [{ label: 'HTML', value: '1000' }],
      // 日期数据
      dataArr: [],
      // 文章列表数据
      articels: [{ id: 1000 }, { id: 1001 }]
    }
  }
}
</script>

<style>
.el-card {
  margin-bottom: 20px;
}
</style>
