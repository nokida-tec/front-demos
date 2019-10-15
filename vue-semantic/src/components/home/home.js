import api from "../../api";

export default {
  data() {
    return {
      msg: 'home页面',
      companys: [],
      secondItem: [],
      tableData: [],
      activeMr:1,
      secActive:1,
    };
  },
  methods: {
    /*初始化数据*/
    getCompany() {
      api.request('get',api.settings.baseUrl+'/companies',null,(res,fn) =>{
        console.log(res);
        this.companys = res;
        this.activeMr = res[0].id;
        api.request('get',api.settings.baseUrl+'/organization/'+  res[0].id +'/suborg',null,(res1,fn) =>{
          console.log(res1);
          this.secondItem = res1;
          this.secActive =  res1[0].id;
          api.request('get',api.settings.baseUrl+'/organization/'+ res1[0].id +'/employee',null,(res2,fn) =>{
            console.log(res2);
            this.tableData = res2
          })
        })
      })
    },
    /* 获取二级部门 */
    getSection(v){
      api.request('get',api.settings.baseUrl+'/organization/'+ v +'/suborg',null,(res,fn) =>{
        console.log(res);
        this.secondItem = res;
        api.request('get',api.settings.baseUrl+'/organization/'+ res[0].id +'/employee',null,(res2,fn) =>{
          console.log(res2);
          this.tableData = res2
        })
      })
    },
    /* 获取人员列表 */
    getEmp(v){
      api.request('get',api.settings.baseUrl+'/organization/'+ v +'/employee',null,(res,fn) =>{
        console.log(res);
        this.tableData = res;
      })
    },
    selectCom(v){
      this.activeMr = v.id
      this.getSection(v.id)
    },
    selectSec(v){
      this.secActive = v.id
      this.getEmp(v.id)
    },
    selectThird(v){
      this.getEmp(v.id)
    },
    editTableData(v){
      this.$msg({
        text: '编辑成功',
        duration: 3000,
        position: 'top',
        background: '#2d77ff'
      })
    },
    delTableData(v){
      console.log(v)
      this.tableData.splice(v,1);
      this.$msg({
        text: '删除成功',
        duration: 3000,
        position: 'top',
        background: '#ff493f'
      })
    },
  },
  // 加载页面
  created() {
    console.log('created')
    this.getCompany()
  },
  // monuted运行时，实例已经挂在到DOM
  mounted() {
    console.log('mounted');
  },

  /* 页面销毁 */
  destroyed () {

  }

}
