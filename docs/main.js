import Vue from 'vue'
import App from './App.vue'

import PaginationComponent from '../src';
Vue.use(PaginationComponent)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
