/*
 * @Author: wgj
 * @Date: 2021-03-22 19:40:55
 * @LastEditTime: 2021-04-25 10:46:06
 * @LastEditors: wgj
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const files = require.context('./modules', false, /\.js$/)
let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        showMenu: true,
        index:0
    },
  },
]
files.keys().forEach(key => {
  const tmp = files(key).default
  console.log(files(key).default)
  routes = routes.concat(...tmp)
})
console.log(routes)

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
