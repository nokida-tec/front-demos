import App from './App'
import './assets/style/main.css'
import router from './router'
import utils from './utils/utils'
import Cookies from 'Cookies'

import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import Msg from 'vue-message'



Vue.prototype.Cookies = Cookies
Vue.config.productionTip = false
Vue.use(utils)
Vue.use(SuiVue)
Vue.use(Msg)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
