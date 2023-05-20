import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "co-main" */ '../views/CoMain/CoMain.vue')
    },
    {
        path: '/forget-password',
        name: 'forget-password',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/forgetPassword.vue')
    },
    {
        path: '/service-type',
        name: 'service-type',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/serviceTypes.vue')
    },
    {
        path: '/main',
        name: 'main',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/main/home.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/main/cart.vue')
    },
    {
        path: '/help',
        name: 'help',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/main/help.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/main/profile.vue')
    },
    {
        path: '/register-info',
        name: 'register-info',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/main/registerInfo.vue')
    },
    {
        path: '/checkin-info',
        name: 'checkin-info',
        meta: { requiresAuth: false },
        component: () => import(/* webpackChunkName: "forget password" */ '../views/CoMain/main/checkin.vue')
    },
]

const router = new createRouter({
    history: process.env.NODE_ENV === 'development' ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
