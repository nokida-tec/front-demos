import App from './App'
import './assets/style/main.css'
import router from './router'
import utils from './utils/utils'
import Cookies from 'Cookies'
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';


Vue.prototype.Cookies = Cookies
Vue.config.productionTip = false
Vue.use(utils)
Vue.use(EasyUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
