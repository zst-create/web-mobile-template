/*
 * @Author: wgj
 * @Date: 2021-03-22 10:26:34
 * @LastEditTime: 2021-04-02 16:05:29
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
import 'vant/lib/index.less';// 引入全部样式
import "assets/css/reset.less";// 引入全部样式
Vue.use(Vant);


import { hex_md5 } from "@/utils/md5";
Vue.prototype.$hex_md5 = hex_md5//挂载到Vue实例上面
import './permission' // permission control

import * as filters from './filters' // 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
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
