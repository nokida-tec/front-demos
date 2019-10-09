
export default {
  data(){
    return {
      msg: '侧边栏',

    }
  },
  created(){

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
