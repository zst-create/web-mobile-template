/*
 * @Author: wgj
 * @Date: 2021-03-26 19:29:37
 * @LastEditTime: 2021-03-31 12:59:03
 * @LastEditors: wgj
 * @Description: 
 */
import router from './router'
import store from './store'
const whiteList = ['/', '/about', '/login', '/home', '/register', '/mine'] // no redirect whitelist
// 路由守卫
router.beforeEach((to, from, next) => {
    let hasLogin = store.getters.getHasLogin
    // 未登录去whiteList里面的路由可以去，去别的则跳转登录页
    if (!hasLogin) {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            //没权限的重定向到登录
            next(`/login?redirect=${to.path}`)
        }
    }
    // /*如果本地 存在 hasLogin 则 不允许直接跳转到 登录页面*/
    if (to.path == '/login' && hasLogin) {
        next({
            path: from.path
        })
    } else {
        next()
    }
})

router.afterEach(route => {
    window.scroll(0, 0);
});