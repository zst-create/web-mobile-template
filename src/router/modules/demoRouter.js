/*
 * @Author: wgj
 * @Date: 2021-03-24 13:52:47
 * @LastEditTime: 2021-03-24 14:09:39
 * @LastEditors: wgj
 * @Description: 
 */
const demoRouter = {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../../views/About.vue')
    component: () => import("@/views/About")
}

export default demoRouter