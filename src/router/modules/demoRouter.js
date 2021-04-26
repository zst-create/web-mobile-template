/*
 * @Author: wgj
 * @Date: 2021-03-24 13:52:47
 * @LastEditTime: 2021-04-25 10:49:12
 * @LastEditors: wgj
 * @Description: 
 */
const demoRouter = [{
    path: '/About',
    name: 'About',
    component: () => import("@/views/About"),
    meta: {
        showMenu: true,
        index:1
    },
}]

export default demoRouter