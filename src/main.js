import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastClick from 'fastclick'
fastClick.attach(document.body)
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


import './network'
import './assets/css/reset.css'
import './assets/css/base.css'
import './assets/fonts/alifont/iconfont.css'
import toast from "./components/common/toast"
Vue.use(toast)
import confirm from "./components/common/confirm";
Vue.use(confirm)
import Header from "./components/common/header/Header";
Vue.component('Header',Header)

Vue.prototype.bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
