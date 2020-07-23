import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
  },
  mutations: {
    saveUserinfo(state,data){
      state.userInfo = data
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
  },
  actions: {
  },
  modules: {
  }
})
