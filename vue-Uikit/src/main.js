import App from './App'
import './assets/style/main.css'
import router from './router'
import utils from './utils/utils'
import Cookies from 'Cookies'

import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'

import '@vuikit/theme'

import UIkit from './uikit'
import Msg from 'vue-message'

Vue.prototype.Cookies = Cookies
Vue.config.productionTip = false
Vue.use(utils)
Vue.use(Vuikit)
Vue.use(VuikitIcons)

Vue.use(UIkit)
Vue.use(Msg)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
