/*
 * @Author: wgj
 * @Date: 2021-03-22 10:26:34
 * @LastEditTime: 2021-03-22 20:14:10
 * @LastEditors: wgj
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons' // icon
import VConsole from "vconsole/dist/vconsole.min.js";
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 移动端适配
// import 'lib-flexible/flexible.js'

// 移动端打印
// let vConsole = new VConsole()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
