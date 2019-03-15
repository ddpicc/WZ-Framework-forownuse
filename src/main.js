import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueResource from 'vue-resource'
import Autocomplete from 'v-autocomplete'
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
import './ui.js' 
Vue.config.productionTip = false;

import 'v-autocomplete/dist/v-autocomplete.css'
Vue.use(VueResource);
Vue.use(Autocomplete)
var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


