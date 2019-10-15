<template >
    <div style="height: 100%">
      <sui-grid celled="internally">
        <sui-grid-row>
          <sui-grid-column :width="3">
            <sui-card class="fluid">
              <sui-segment >
                <sui-list divided  relaxed>
                  <sui-list-item v-for="com in companys"  :key="com.id"  :class="{ activeCom: activeMr==com.id }">
                    <sui-list-content>
                      <sui-list-header class="com-header" @click="selectCom(com)">{{com.name}}</sui-list-header>
                    </sui-list-content>
                  </sui-list-item>
                </sui-list>
              </sui-segment>
            </sui-card>

            <sui-card class="fluid">
              <sui-accordion exclusive >
                <div v-for="(zu,index) in secondItem"  :key="zu.id">
                  <sui-accordion-title  :active="zu.id == secActive" :class="{ activeSec: secActive == zu.id }" @click="selectSec(zu)">
                    <sui-icon name="dropdown" /><span>{{zu.name}}</span>
                  </sui-accordion-title>
                  <sui-accordion-content :active="zu.id == secActive" >
                    <sui-segment >
                      <sui-list divided  relaxed>
                        <sui-list-item v-for="x in zu.children"  :key="x.id">
                          <sui-list-content>
                            <sui-list-header class="third-header" @click="selectThird(x)">{{x.name}}</sui-list-header>
                          </sui-list-content>
                        </sui-list-item>
                      </sui-list>
                    </sui-segment>
                  </sui-accordion-content>
                </div>
              </sui-accordion>
            </sui-card>

          </sui-grid-column>
          <sui-grid-column :width="13">
            <sui-table striped>
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>编号</sui-table-header-cell>
                  <sui-table-header-cell>姓名</sui-table-header-cell>
                  <sui-table-header-cell>E-mail</sui-table-header-cell>
                  <sui-table-header-cell>操作</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row v-for="(tabData,index) in tableData" :key="tabData.id">
                  <sui-table-cell>{{tabData.id}}</sui-table-cell>
                  <sui-table-cell>{{tabData.name}}</sui-table-cell>
                  <sui-table-cell>{{tabData.email}}</sui-table-cell>
                  <sui-table-cell>
                    <sui-button positive content="编辑" @click="editTableData(index)"/>
                    <sui-button negative content="删除" @click="delTableData(index)"/>
                  </sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-grid-column>
        </sui-grid-row>

      </sui-grid>


    </div>
</template>

<style scoped>
  @import "./home.css";
</style>

<script>
  import home from './home'
  export default home
</script>
