<template>
  <div class="grid-container home">
    <div class="grid-x">
      <div class="cell small-3 medium-3 large-2">
        <ul id="accordion-menu" class="vertical menu com-ul" data-accordion-menu>
          <li v-for="(com,index) in companys" :class="{'com-selected':isActive==com.id}" @click="selectCom(com)"><a>{{com.name}}</a></li>
        </ul>
        <div style="width: 100%;height: 25px"></div>
        <ul id="accordion" class="accordion" data-accordion>
          <li v-for="item in secondItem" :class="{'isselected':secActive==item.id}" class="accordion-item" data-accordion-item @click="selectSec(item)">
            <a href="#" class="accordion-title">{{item.name}}</a>
            <div class="accordion-content" data-tab-content>
              <div v-for="s in item.children" class="third-con" :aaa="s.id" @click="selectThird($event,s)">{{s.name}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="cell small-9 medium-9 large-10">
        <table>
          <thead>
          <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>Email</th>
            <th width="400">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(con, idx) in tableData">
            <td >{{con.id}}</td>
            <td>{{con.name}}</td>
            <td>{{con.email}}</td>
            <td>
              <button type="button" class="success button tiny home-btn" @click="edit(idx)">编辑</button>
              <button type="button" class="alert button tiny home-btn" @click="del(idx)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index';
export default {
  mounted() {
    this.accordionMenu = new Foundation.AccordionMenu($('#accordion-menu'), {
      slideSpeed: 500,
      multiOpen: true,
    });
    this.accordion = new Foundation.Accordion($('#accordion'), {
      slideSpeed: 500,
      multiExpand: true,
    });
  },
  name: 'hello',
  data() {
    return {
      msg: 'Vue + Foundation',
      isActive: 1,
      secActive:1,
      comList: [{ id: 1, name: '上海轩田' }, { id: 2, name: '杭州轩田' }],
      companys: [],
      secondItem: [{"id":3,"name":"行政人事部"},{"id":4,"name":"技术部"},{"id":5,"name":"数字化工厂"},{"id":6,"name":"思考思考"},{"id":7,"name":"行政人事部"},{"id":8,"name":"技术部",},{"id":9,"name":"数字化工厂"},{"id":10,"name":"思考思考",}],
      tableData: [],
    };
  },
  created(){
    this.getCompany();
  },
  methods: {
    edit(v) {
      console.log(v)
      this.$msg({
        text: '编辑成功',
        duration: 3000,
        position: 'top',
        background: '#2d77ff'
      })
    },
    del(v) {
      console.log(v)
      this.tableData.splice(v,1);
      this.$msg({
        text: '删除成功',
        duration: 3000,
        position: 'top',
        background: '#ff493f'
      })
    },
    /* 初始化数据 */
    getCompany() {
      api.request('get', api.settings.baseUrl + '/companies', null, (res, fn) => {
        console.log(res);
        this.companys = res;
        this.isActive = res[0].id
        api.request('get', api.settings.baseUrl + '/organization/' + res[0].id + '/suborg', null, (res1, fn) => {
          console.log(res1);
          res1.forEach((v) => {
            console.log(v)
            v['text'] = v.name;
            if (v.children.length > 0) {
              v.children.forEach((val) => {
                val['text'] = val.name;
              });
            }
          });
          this.secondItem = res1;
          this.secActive = res1[0].id
          api.request('get', api.settings.baseUrl + '/organization/' + res1[0].id + '/employee', null, (res2, fn) => {
            console.log(res2);
            this.tableData = res2;
          });
        });
      });
    },
    /* 获取二级部门 */
    getSection(v){
      api.request('get',api.settings.baseUrl+'/organization/'+ v +'/suborg',null,(res,fn) =>{
        console.log(res);
        res.forEach((v,i) => {
          console.log(v)
          v['text'] = v.name;
          if(v.children.length>0){
            v.children.forEach((val,idx) => {
              val['text']=val.name
            })
          }
        });
        this.secondItem = res;
      })
    },
    /* 获取人员列表 */
    getEmp(v){
      api.request('get',api.settings.baseUrl+'/organization/'+ v +'/employee',null,(res,fn) =>{
        console.log(res);
        this.tableData = res;
      })
    },

    /* 选择二级 */
    selectSec(v){
      console.log(v)
      this.getEmp(v.id);
      this.secActive = v.id;
    },
    selectThird(e,v) {
      console.log(e.target.getAttribute('aaa'));
      console.log(v.id);
      this.getEmp(e.target.getAttribute('aaa'));
      window.event? window.event.cancelBubble = true : e.stopPropagation();
    },
    selectCom(v) {
      console.log(v);
      this.isActive = v.id;
      this.getSection(v.id);
    },
  },
  watch: {
    'companys': function(newVal){
      console.log('@@@@@@@@@@');
      console.log(newVal);
      this.companys = newVal
    },
    'secondItem': function(newVal){
      this.secondItem = newVal
    }
  },
  destroyed() {
    this.accordionMenu.destroy();
    this.accordion.destroy();
  },
};
</script>

<style lang="scss" scoped>
  .home a{
     color:  #0A0A0A;
  }

  .image {
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .call-button {
    border-radius: 20px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  .com-ul{
    border: 1px solid #c7c7c7;
    li{
      border-bottom: 1px solid #c7c7c7;
    }
    li:last-child{
      border-bottom: none;
    }
  }

  .com-selected a{
    color: #1779ba;
  }
  .home-btn{
    margin: 0;
  }

  .isselected>a{
    color: #1779ba;
  }
  .third-con{
    margin-bottom: 5px;
  }
  .third-con:hover{
    cursor: pointer;
  }


</style>
