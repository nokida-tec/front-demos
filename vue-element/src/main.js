import App from './App'
import './assets/style/main.css'
import router from './router'
import utils from './utils/utils'
import Cookies from 'Cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.Cookies = Cookies
Vue.config.productionTip = false
Vue.use(utils)
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
