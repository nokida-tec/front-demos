

export default {
  data () {
    return {
      msg: 'home页面',
      meal: '',
      deviceLists:[
        {id:1,name:'上海轩田'},
        {id:2,name:'杭州轩田'}
      ],
      activeMr:1,
      conList:[{id:1,name:'人事部',chidren:[{id:1,name:'会计'},{id:2,name:'财务'}]},{id:2,name:'技术部',chidren:[{id:1,name:'houtai'},{id:2,name:'前端'}]},{id:3,name:'顾问部',chidren:[{id:1,name:'A级'},{id:2,name:'B级'}]}],
      text:'222sdsds',
      items: [
        { id:1,isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
        { id:2,isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
        {id:3,isActive: false, age: 9, name: { first: 'Mini', last: 'Navarro' },},
        { id:4,isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
        { id:5,isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
        { id:6,isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
        { id:7,isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
      ],
      fields: [
        { key: 'id', label: '编号' },
        { key: 'name', label: '姓名' },
        { key: 'age', label: '年龄',  class: 'text-center' },
        {
          key: 'isActive',
          label: 'is Active',
        },
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
  },
  methods: {
    hello(){
      console.log(' hello world ! ');
    },
    selectCom(v){
      this.activeMr = v.id
    },
    /*  */
    viewinfo(item, index, button) {
      console.log(index)
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      console.log(button)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
  }
}
