<template>
  <div class="fans-container">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-list">
            <div class="fans-item" v-for="item in FansList" :key="item.id.toString()">
              <el-avatar style="width:80px;height:80px" :src="item.photo"></el-avatar>
              <p style="font-size:12px">{{item.name}}</p>
              <el-button type="primary" size="mini">+关注</el-button>
            </div>
          </div>
          <!-- 分页列表 -->
          <el-pagination
            background
            layout="prev, pager, next, total"
            :total="total"
            :page-size="reqParams.per_page"
            @current-change="changePage"
            :current_page="reqParams.page"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">
          <div ref="dom" style="width:600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 24
      },
      FansList: [],
      activeName: 'list',
      // 总条数
      total: 0
    }
  },
  //   获取粉丝列表数据
  created () {
    this.getFansList()
  },
  mounted () {
    // 需要操作DOM
    const dom = this.$refs.dom
    const myChart = echarts.init(dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  },
  methods: {
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    //   获取列表数据
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      //   获取数据列表
      this.FansList = data.results
      //   获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.fans-item {
  text-align: center;
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  padding-top: 15px;
  margin-right: 50px;
  margin-bottom: 20px;
  display: inline-block;
}
</style>
