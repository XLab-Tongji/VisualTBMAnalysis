import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/data/index.vue'
import Home from '../components/login/Home.vue'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'

Vue.use(Router)

const routes = [
  
  {path:'/',redirect:'/login'},
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{title: '这是一个测试界面'}   
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{title: '欢迎来到泥水盾构可视化平台'}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{title: '注册界面'}
  },
  {
    path: '/index',
    component: index,
    meta:{title: '可视化界面'}
  },
]

const router = new Router({
  //history: createWebHistory(process.env.BASE_URL),
  mode:'history',
  routes
})

// 限制某些页面禁止未登录访问
//let limitPagePath = ['/home']

// router.beforeEach((to, from, next) => {
//     if (limitPagePath.includes(to.path)) {
//         // 判断sessionStorage是否保存了用户信息
//         let userStr = sessionStorage.getItem("user") || "{}"
//         let user = JSON.parse(userStr)
//         if (!user.id) {
//             // 跳转到登录页面
//             next({path: "/login"})
//         } else {
//             next()
//         }
//     } else {
//         next()
//     }
// })

export default router
