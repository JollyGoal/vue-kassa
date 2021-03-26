import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/Home',
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
        path: '/Add/${id}',
        name: 'Add',
        component: () => import('../views/Add.vue')
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
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

export default router
