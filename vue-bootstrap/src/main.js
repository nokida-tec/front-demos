import App from './App'
import './assets/style/main.css'
import router from './router'
import utils from './utils/utils'
import Cookies from 'Cookies'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.Cookies = Cookies
Vue.config.productionTip = false
Vue.use(utils)
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
