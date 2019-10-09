<template>
  <div style="margin-left: 200px">
    <el-row >
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
        <div style="height: 150px;">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="vertical"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item  v-for="(com,index) in themes" key="com.index" :index="com.id">{{com.name}}</el-menu-item>
          </el-menu>

        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="17" :xl="17">
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
      </el-col>
    </el-row>



  </div>
</template>

<style scoped>
  @import "./home.css";
</style>

<script>
  import home from './home'
  export default home
</script>
