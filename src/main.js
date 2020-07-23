import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastClick from 'fastclick'
fastClick.attach(document.body)


import './network'
import './assets/css/reset.css'
import './assets/css/base.css'
import './assets/fonts/alifont/iconfont.css'
import toast from "./components/common/toast"
Vue.use(toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
