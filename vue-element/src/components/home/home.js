import api from '../../api/index'

export default {
  data () {
    return {
      baseUrl:'http://172.16.0.133:9000/services/wms/api',
      themes :[],
      currentChecked : 1,
      currentCheckedOne: 1,
      oneLevelList :[],
      msg: 'home页面',
      activeIndex: 1,
      data: [{
        label: '人事部',
        children: [{
          label: '会计',
        },{
          label: '财务',
        }]
      }, {
        label: '技术部',
        children: [{
          label: '前端',
        },{
          label: '后台',
        }]
      }, {
        label: '顾问部',
        children: [{
          label: 'A级',
        }, {
          label: 'B级',
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: []
    }
  },
  created(){
    this.getCompany();
  },
  methods: {
    /* gs*/
    getCompany() {
      api.request('get',this.baseUrl+'/companies',null,(res,fn) =>{
        console.log(res);
        this.themes = res;
        api.request('get',this.baseUrl+'/organization/'+ this.themes[0].id +'/suborg',null,(res1,fn) =>{
          console.log(res1);
          res1.forEach((v,i) => {
            console.log(v)
            v['label'] = v.name;
            if(v.children.length>0){
              v.children.forEach((val,idx) => {
                val['label']=val.name
              })
            }
          });
          this.data = res1;
          api.request('get',this.baseUrl+'/organization/'+ res1[0].id +'/employee',null,(res2,fn) =>{
            console.log(res2);
            this.tableData = res2;
          })
        })
      })
    },
    /* 获取二级部门 */
    getSection(v){
      api.request('get',this.baseUrl+'/organization/'+ v +'/suborg',null,(res,fn) =>{
        console.log(res);
        res.forEach((v,i) => {
          console.log(v)
          v['label'] = v.name;
          if(v.children.length>0){
            v.children.forEach((val,idx) => {
              val['label']=val.name
            })
          }
        });
        this.data = res;
      })
    },
    /* 获取人员列表 */
    getEmp(v){
      api.request('get',this.baseUrl+'/organization/'+ v +'/employee',null,(res,fn) =>{
        console.log(res);
        this.tableData = res;
      })
    },
    hello(){
      console.log(' hello world ! ');
    },
    handleNodeClick(data) {
      console.log(data);
      this.getEmp(data.id)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      api.request('get',this.baseUrl+'/organization/'+ key +'/suborg',null,(res,fn) =>{
        console.log(res);
        res.forEach((v,i) => {
          console.log(v)
          v['label'] = v.name;
          if(v.children.length>0){
            v.children.forEach((val,idx) => {
              val['label']=val.name
            })
          }
        });
        this.data = res;
        api.request('get',this.baseUrl+'/organization/'+ res[0].id +'/employee',null,(res2,fn) =>{
          console.log(res2);
          this.tableData = res2;
        })
      })
    },
    handleClick(row) {
      console.log(row);
      this.$message({
        message: '编辑成功',
        type: 'success'
      });
    },
    handledelClick(row) {
      console.log(row);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    }
  }
}
