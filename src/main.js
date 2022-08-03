import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'

// import commancommands from '../scripts'
Vue.use(BootstrapVue);
new Vue({
  el: '#app',
  render: h => h(App)
})
