import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import store from '../vuex/vuex'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home

    },
    {
        path: '/Sclad',
        name: 'Sclad',
        component: () => import('../views/Sclad.vue')
    },
    {
        path: '/Static',
        name: 'Static',
        component: () => import('../views/Static.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/Add/:id',
        name: 'Add',
        props: true,
        component: () => import('../views/Add.vue')
    },
    {
        path: '/Exp',
        name: 'Exp',
        component: () => import('../views/Exp.vue')
    },
    {
        path: "/Order",
        name: 'Order',
        component: () => import('../views/Order.vue')
    },
    {
        path: '/User',
        name: 'User',
        component: () => import('../views/User.vue')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {

    if (store.state.token.length === 0 && to.path !== '/login') {
        return next('/login')
    }

    if (store.state.user) {
        await store.dispatch('getMe')
    }
    console.log(store.state.user)

    return next()
});

export default router
