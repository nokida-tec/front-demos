<template>
    <div class="dashboard-container">
      <div class="pure-g">
        <div class="pure-u-4-24">
          <el-card shadow="hover">
            <div class="pure-menu custom-restricted-width com" >
              <ul class="pure-menu-list">
                <li v-for="com in themes"  class="pure-menu-item com-li"   :key=com.id @click="selectCom(com)"><a href="#" class="pure-menu-link com-a" :class="{'com-selected':isActive==com.id}">{{com.name}}</a></li>
              </ul>
            </div>
            <div style="width: 100%;height: 25px"></div>
            <div class="tree-bm">
              <el-tree  node-key="id" :data="secondItem" ref="tree" highlight-current :props="defaultProps" accordion    @node-click="handleNodeClick"></el-tree>
            </div>
          </el-card>

        </div>
        <div class="pure-u-20-24">
          <el-card shadow="hover">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="编号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                minWidth="120">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮编"
                minWidth="120">
              </el-table-column>
              <el-table-column
                label="操作"
                minWidth="150">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small" @click="handledelClick(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>
      <!--  <el-row :gutter="20">
            <template v-if="cardData.length">
                <el-col v-for="(item, index) in cardData" :key="index" :class="index>4?'hidden-xl-only':''" :xs="24" :sm="12" :md="8" :xl="5">
                    <el-card class="card-item" shadow="hover">
                        <div class="item-title">
                            {{item.name}}
                            <el-tooltip v-if="item.desc" :content="item.desc" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </div>
                        <div class="item-date">
                            <span v-if="item.date[1]">{{item.date[0]}} - {{item.date[1]}}</span>
                            <span v-else>{{item.date[0]}}</span>
                            <span v-if="item.isToday && item.date[1]">今日</span>
                        </div>
                        <div class="item-value">{{item.value||0}}<span v-text="item.unit"></span></div>
                        <template>
                            <div class="data-state">
                                <span v-if="item.chainRatio" :class="{'state-up': item.chainRatio.type, 'state-down': !item.chainRatio.type}">
                                    环比<i :class="{'el-icon-caret-top':item.chainRatio.type,'el-icon-caret-bottom':!item.chainRatio.type}">{{item.chainRatio.value}}</i>
                                </span>
                                <span v-else></span>
                                <span v-if="item.yearOnYear" :class="{'state-up': item.yearOnYear.type, 'state-down': !item.yearOnYear.type}">
                                    同比<i :class="{'el-icon-caret-top':item.yearOnYear.type,'el-icon-caret-bottom':!item.yearOnYear.type}">{{item.yearOnYear.value}}</i>
                                </span>
                            </div>
                        </template>
                    </el-card>
                </el-col>
            </template>
            <template v-else>
                <el-col v-for="item in [1, 2, 3, 4, 5]" :key="item" :xs="24" :sm="12" :md="8" :xl="5">
                    <el-card class="card-item center" shadow="hover">
                        <content-loader :height="162" :width="400" :speed="2" primaryColor="#ddd" secondaryColor="#ecebeb">
                            <rect x="0" y="0" rx="4" ry="4" width="60" height="30" />
                            <rect x="0" y="40" rx="4" ry="4" width="300" height="10" />
                            <rect x="340" y="40" rx="4" ry="4" width="60" height="10" />
                            <rect x="0" y="70" rx="8" ry="8" width="120" height="50" />
                            <rect x="130" y="90" rx="8" ry="8" width="30" height="30" />
                            <rect x="0" y="150" rx="4" ry="4" width="190" height="10" />
                            <rect x="210" y="150" rx="4" ry="4" width="190" height="10" />
                        </content-loader>
                    </el-card>
                </el-col>
                <el-col class="hidden-xl-only" :xs="24" :sm="12" :md="8" :xl="5">
                    <el-card class="card-item center" shadow="hover">
                        <content-loader :height="162" :width="400" :speed="2" primaryColor="#ddd" secondaryColor="#ecebeb">
                            <rect x="0" y="0" rx="4" ry="4" width="60" height="30" />
                            <rect x="0" y="40" rx="4" ry="4" width="300" height="10" />
                            <rect x="340" y="40" rx="4" ry="4" width="60" height="10" />
                            <rect x="0" y="70" rx="8" ry="8" width="120" height="50" />
                            <rect x="130" y="90" rx="8" ry="8" width="30" height="30" />
                            <rect x="0" y="150" rx="4" ry="4" width="190" height="10" />
                            <rect x="210" y="150" rx="4" ry="4" width="190" height="10" />
                        </content-loader>
                    </el-card>
                </el-col>
            </template>
        </el-row>
        <el-card shadow="hover">
            <div class="chart-title">
                <div>GMV趋势</div>
                <el-button class="date" type="text">2019/03/01-2019/03/19</el-button>
                &lt;!&ndash;<el-date-picker :inline="true">
                </el-date-picker>&ndash;&gt;
            </div>
            <div id="chart-trends"></div>
        </el-card>-->
    </div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from 'echarts'
import { ContentLoader } from 'vue-content-loader'
import { dashboard } from '@/apis/dashboard'
import request from '@/utils/request'
import './index.scss'

var chartTrends
export default {
  name: 'dashboard',
  components: {
    ContentLoader
  },
  metaInfo () {
    return {
      /* titleTemplate: '%s - 首页',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'dashboard-keyword' },
        { vmid: 'description', name: 'description', content: 'dashboard-description' }
      ] */
    }
  },
  data () {
    return {
      baseUrl: 'http://172.16.0.133:9000/services/wms/api',
      cardData: [],
      themes: [],
      secondItem: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isActive: 1,
      tableData: []
    }
  },
  created () {
    // this.hello()
    this.csh()
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    // chartTrends = echarts.init(document.getElementById('chart-trends'))
    // setTimeout(this.fetchData, 800)
  },
  methods: {
    getCompany (data) {
      return request({
        url: this.baseUrl + '/companies',
        method: 'get',
        data
      })
    },
    /* 获取二级部门 */
    getSection (data, v) {
      return request({
        url: this.baseUrl + '/organization/' + v + '/suborg',
        method: 'get',
        data
      })
    },
    /* 获取人员列表 */
    getEmp (data, v) {
      return request({
        url: this.baseUrl + '/organization/' + v + '/employee',
        method: 'get',
        data
      })
    },
    /* csh */
    async csh () {
      let res = await this.getCompany()
      this.themes = res
      this.isActive = res[0].id
      let res1 = await this.getSection(null, res[0].id)
      this.secondItem = res1
      console.log(res1)
      this.$refs.tree.setCheckedKeys([4])
      let res2 = await this.getEmp(null, res1[0].id)
      console.log(res2)
      this.tableData = res2
    },
    selectCom (v) {
      this.isActive = v.id
    },
    setCheckedKeys () {
      this.$refs.tree.setCheckedKeys([0])
    },
    async handleNodeClick (data) {
      let res = await this.getEmp(null, data.id)
      console.log(res)
      this.tableData = res
    },
    handleClick (row) {
      console.log(row)
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
    },
    handledelClick (row) {
      console.log(row)
      this.tableData.splice(row, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    async fetchData () {
      let res = await dashboard()
      if (res.success) {
        this.cardData = res.data
      }
      // 绘制图表
      chartTrends.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '5%',
          bottom: '2%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false }
        },
        series: [
          {
            name: '新注册用户',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: [ 120, 532, 101, 634, 90, 730, 210 ]
          }
        ]
      })
    },
    /*    resizeCallBack (delayFlag) {
      // 页面尺寸变化时重新绘制
      setTimeout(() => {
        chartTrends.resize()
      }, delayFlag ? 300 : 0)
    }, */
    search () {
      // eslint-disable-next-line
      console.log('search ...')
    }
  }
}
</script>
