/*
 * @Author: wgj
 * @Date: 2021-03-22 19:40:55
 * @LastEditTime: 2021-03-24 14:08:29
 * @LastEditors: wgj
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import demoRouter from '@/router/modules/demoRouter'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  demoRouter
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {//课件
  //   path: "/inClassDetail/courseware",
  //   name: "courseware",
  //   component: () => import("./views/courseDetails/taskDetails/courseware.vue")
  // },
]
export const constantRoutes = [
  demoRouter
]
// const router = new VueRouter({
//   routes
// })
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
