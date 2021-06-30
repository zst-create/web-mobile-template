/*
 * @Author: wgj
 * @Date: 2021-03-22 10:26:34
 * @LastEditTime: 2021-04-28 16:12:13
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

//集成环境或者正式环境才收集错误信息
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
if (process.env.NODE_ENV == "production"|| process.env.NODE_ENV == "sit") {
  fundebug.init({
    apikey: "c34f2bef2d5eb9b0602c258636082bd31453e96f40a837de256cd9e289bcee50",
    silentDev: false,
    silentConsole: true
  })
  fundebugVue(fundebug, Vue);
}
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
