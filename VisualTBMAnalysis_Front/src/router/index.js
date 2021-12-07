import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/main/home.vue'
import login from '../components/login/Login.vue'
import register from '../components/login/Register.vue'
import Analysis from '../components/analysis/analysis.vue'
import Data from '../components/data/data.vue'
import Intro from '../components/main/intro.vue'

Vue.use(Router)

const routes = [

    { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: login, },
    { path: '/register', name: 'register', component: register },

    {
        path: '/home',
        component: home,
        redirect: '/intro',
        children: [
            { path: '/intro', component: Intro },
            { path: '/data', component: Data },
            { path: '/analysis', component: Analysis },
        ]
    },

]

const router = new Router({
    //history: createWebHistory(process.env.BASE_URL),
    mode: 'history',
    routes
})

//限制某些页面禁止未登录访问
// let limitPagePath = ['/home', '/intro', '/data', '/analysis']

// router.beforeEach((to, from, next) => {
//     if (limitPagePath.includes(to.path)) {
//         // 判断sessionStorage是否保存了用户信息
//         let userStr = sessionStorage.getItem("user") || "{}"
//         let user = JSON.parse(userStr)
//         if (!user.id) {
//             // 跳转到登录页面
//             next({ path: "/login" })
//         } else {
//             next()
//         }
//     } else {
//         next()
//     }
// })

export default router