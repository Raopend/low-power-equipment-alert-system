import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            meta: {
                title: '主页'
            },
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue')
        },
        {
            meta: {
                title: '预警'
            },
            path: '/alert',
            name: 'Alert',
            component: () => import('@/views/Alert.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {top: 0}
    }
})

export default router