import api from '../../api/index'

export default {
  data () {
    return {
      msg: 'home页面',
      secondItem: [],
      companys: [],
      tableData: [],
      meal: '',
      activeMr:1,
      fields: [
        { key: 'id', label: '编号' },
        { key: 'name', label: '姓名' },
        { key: 'email', label: 'email',},
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  created(){
    this.hello();
    this.getCompany();
  },
  methods: {
    hello(){
      console.log(' hello world ! ');
    },
    editinfo(item, index, button) {
      console.log(index);
      this.$bvToast.toast(`编辑成功`, {
        title: '提示！',
        autoHideDelay: 3000,
        appendToast: false,
        variant: 'success',
        solid: true
      })
    },
    /* 删除 */
    delinfo(item, index, button) {
      console.log(index);
      this.tableData.splice(index,1);
      this.$bvToast.toast(`删除成功`, {
        title: '提示！',
        autoHideDelay: 3000,
        appendToast: false,
        variant: 'danger',
        solid: true
      })
      /*this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      console.log(button)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)*/
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    /*初始化数据*/
    getCompany() {
      api.request('get',api.settings.baseUrl+'/companies',null,(res,fn) =>{
        console.log(res);
        this.companys = res;
        this.activeMr = res[0].id;
        api.request('get',api.settings.baseUrl+'/organization/'+  res[0].id +'/suborg',null,(res1,fn) =>{
          console.log(res1);
          this.secondItem = res1;
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
    selectSec(v) {
      console.log(v)
      this.getEmp(v.id)
    },
    selectThird(v) {
      console.log(v)
      this.getEmp(v.id)
    },
  }
}
