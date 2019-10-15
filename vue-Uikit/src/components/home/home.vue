<template >
    <div style="height: 100%;">
      <vk-grid gutter="collapse">
        <div class="uk-width-1-6@m">
          <vk-card class="uk-card-small">
            <ul class="uk-list com-ul">
              <li v-for="com in companys"  :key="com.id"  :class="{ activeCom: activeMr==com.id }"  @click="selectCom(com)">{{com.name}}</li>
            </ul>
            <div style="width: 100%;height: 25px"></div>
            <div class="com-ul sec-ul">
              <ul uk-accordion>
                <li v-for="(zu,index) in secondItem"  :key="zu.id" :class="[{'uk-open': secActive == zu.id}]">
                  <a class="uk-accordion-title" :class="[{activeSec: secActive == zu.id}]" @click="selectSec(zu)">{{zu.name}}</a>
                  <div class="uk-accordion-content" >
                    <ul class="uk-list com-ul">
                      <li v-for="x in zu.children"  :key="x.id" @click="selectThird(x)">{{x.name}}</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </vk-card>

        </div>
        <div class="uk-width-expand@m">
          <vk-card class="uk-card-small">
            <div>
              <table class="uk-table uk-table-striped">
                <thead>
                <tr>
                  <th>编号</th>
                  <th>姓名</th>
                  <th>E-mail</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(tabData,index) in tableData" :key="tabData.id">
                  <td>{{tabData.id}}</td>
                  <td>{{tabData.name}}</td>
                  <td>{{tabData.email}}</td>
                  <td>
                    <vk-button type="primary" size="small" @click="editTableData(index)">编辑</vk-button>
                    <vk-button type="danger" size="small" @click="delTableData(index)">删除</vk-button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <!--<vk-table :data="tableData" striped>
              <vk-table-column title="编号" cell="id"></vk-table-column>
              <vk-table-column title="姓名" cell="name"></vk-table-column>
              <vk-table-column title="E-mail" cell="email"></vk-table-column>
            </vk-table>-->
          </vk-card>
        </div>
      </vk-grid>

    </div>
</template>

<style scoped>
  @import "./home.css";
</style>

<script>
  import home from './home'
  export default home
</script>
