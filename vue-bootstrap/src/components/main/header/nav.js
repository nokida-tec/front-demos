export default {
  data () {
    return {
      meal: ''
    }
  },
  created(){
    this.hello();
  },
  methods: {
    hello(){
      console.log(' hello world ! ');
    },
    getMeal(){
      console.log('1111 ');
    }
  }
}
