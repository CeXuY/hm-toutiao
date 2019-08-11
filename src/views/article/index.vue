<template>
  <div class="container">
    <!-- 筛选区域 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
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
          <!-- <el-select v-model="reqParmams.channel_id" clearable placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->

          <!-- 使用自己定义的 my-channel 组件 -->
          <my-channel v-model="reqParmams.channel_id"></my-channel>
        </el-form-item>

        <el-form-item label="日期：">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              @change="changeDate"
              value-format="yyyy-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条数据</div>
      <!-- 表格组件 -->
      <!-- data="articles"  绑定文章列表数据 -->
      <el-table :data="articles">
        <!-- el-table-column 列组件 -->
        <!-- prop="date" 指定当前的每一行显示的数据的字段的名称 -->
        <!-- label="日期"  label： 表头 -->
        <el-table-column label="编号">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]" alt /> -->
            <!-- 加载没有图片数据的行 -->
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error" class="image-slot">
                <!-- 使用一张默认图 -->
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!-- 使用插槽 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <!-- 发布时间 -->
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle plain></el-button>
            <!-- 删除数据根据id删除 -->
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center; margin-top:30px">
        <!-- layout="prev, pager, next"   layout:布局  prev:上一页按钮  pager:中间的按钮   next：下一页的按钮 -->
        <!-- :total="total"  指定的总条数    page-size:  每页显示的条数数目   默认为 10
        需要动态绑定  和后台数据的每页显示条数一致-->

        <!-- 当更改页码的时候， 需要拿着页码重新向后台申请渲染列表 -->

        <!-- 当您点击按钮的分页  不会去选中按钮的样式   需要将当前页码数据和分页组件进行绑定 -->
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :page-size="reqParmams.per_page"
          @current-change="changePage"
          :current_page="reqParmams.page"
        ></el-pagination>
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
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项
      channelOptions: [],
      // 日期数据
      dataArr: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 使用侦听器 watch 监听数据
  // watch: {
  //   'reqParmams.channel_id': function (newVal) {
  //     if (newVal === '') {
  //       // axios 不会把参数提交给后台
  //       this.reqParmams.channel_id = null
  //     }
  //   }
  // },
  created () {
    // // 获取频道下拉选项数据
    // this.getChannelOptions()
    // 获取文章列表数据
    this.getArticles()
  },

  methods: {
    // 编辑文章方法
    edit (id) {
      // 编辑文章 和 发布文章 使用的是同一个路由规则
      // 如果使用 params 是路径传参  publish   /publish/1000   这就是两个路由规则
      // 使用query 传参   /publish    /publish/?id=10
      this.$router.push('/publish/?id=' + id)
    },
    // 删除文章
    del (id) {
      // 弹出一个确认框
      // 点击确认   发起删除请求
      // 删除成功   提示   更新列表
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('该文章删除成功')
          this.getArticles()
        })
        .catch(() => {})
    },
    // 选择日期后的函数
    changeDate (dataArr) {
      // dataArr [起始日期，结束日期]
      // dataArr 有清空功能   清空后的值 null 需要严谨处理
      // 把日期格式转换格式，使用moment插件即可    但是组件帮忙提供了方法
      if (dataArr) {
        this.reqParmams.begin_pubdate = dataArr[0]
        this.reqParmams.end_pubdate = dataArr[1]
      } else {
        this.reqParmams.begin_pubdate = null
        this.reqParmams.end_pubdate = null
      }
    },
    // 筛选数据的方法
    search () {
      // 其他数据是双向绑定的  不需要进行修改
      this.reqParmams.page = 1
      // 重新渲染列表
      this.getArticles()
    },
    // 页码改变事件
    changePage (newPage) {
      // 将第一页的页码改变成当前点击的页码
      this.reqParmams.page = newPage
      // 重新渲染列表
      this.getArticles()
    },
    // // 获取下拉菜单选项方法
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      // 请求方式是get 请求方式，传参需要 url?key=value&key1=value1···如果有多项，会很麻烦
      // axios 有另一种传参方式  第二个参数是一个对象 { params:指定参数对象 }  更加便利
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParmams })
      // 文章列表
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style>
.el-card {
  margin-bottom: 20px;
}
</style>
