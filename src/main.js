import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './assets/css/reset.css'
import './assets/css/base.css'
import './assets/fonts/alifont/iconfont.css'

import './network'
import './assets/js/global'
import './assets/js/filters'

Vue.prototype.bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
