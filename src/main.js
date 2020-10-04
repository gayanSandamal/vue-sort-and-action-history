import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import VueContentPlaceholders from 'vue-content-placeholders'

import './assets/styles/index.css'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)
Vue.use(VueContentPlaceholders)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
