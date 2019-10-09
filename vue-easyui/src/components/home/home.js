import api from '../../api/index'

export default {
  data () {
    return {
      msg: 'home页面',
      collapsed: false,
      selection: null,
      secondItem: [],
      companys: [],
      isActive:1,
      tableData: [],
      title: '',
      model: {
        itemid: null,
        name: null,
        listprice: null,
        unitcost: null,
        attr: null,
        status: true
      },
      rules: {
        itemid: 'required',
        name: 'required'
      },
      errors: {},
      editingRow: null,
      selectedIndex:0
    }
  },
  created(){
    this.getCompany();
  },
  methods: {
    selectionCom(e){
      console.log(e)
      this.isActive = e.id
      this.getSection(e.id)
    },
    /*初始化数据*/
    getCompany() {
      api.request('get',api.settings.baseUrl+'/companies',null,(res,fn) =>{
        console.log(res);
        this.companys = res;
        this.isActive = res[0].id
        api.request('get',api.settings.baseUrl+'/organization/'+  res[0].id +'/suborg',null,(res1,fn) =>{
          console.log(res1);
          res1.forEach((v,i) => {
            console.log(v)
            v['text'] = v.name;
            if(v.children.length>0){
              v.children.forEach((val,idx) => {
                val['text']=val.name
              })
            }
          });
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
    selectSec(e,v){
      let idx = -1;
      if(e.target.getAttribute('aaa') === null){
        idx = v.id
      } else {
        idx = e.target.getAttribute('aaa')
      }
      this.getEmp(idx)
    },
    editRow(row){
      this.editingRow = row;
      this.model = Object.assign({}, row);
      this.title = '编辑';
      this.$refs.dlg.open();
    },
    saveRow(){
      this.$refs.form.validate(errors => {
        if (!errors){
          const newRow = Object.assign({}, this.model);
          if (this.editingRow){
            const index = this.tableData.indexOf(this.editingRow);
            this.tableData.splice(index,1,newRow);
            this.editingRow = null;
          } else {
            this.tableData.unshift(newRow)
          }
          this.$refs.dlg.close();
        }
      })
    },
    deleteRow(row){
      this.$messager.confirm({
        title: '确认',
        msg: 'Are you sure you want to delete the row?',
        result: (r) => {
          if (r){
            const index = this.tableData.indexOf(row);
            this.tableData.splice(index,1);
          }
        }
      })
    },
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    hasError(name) {
      return this.getError(name) != null;
    }
  }
}
