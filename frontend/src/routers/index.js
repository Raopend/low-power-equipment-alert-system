import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            meta: {
                title: 'Home'
            },
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue')
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {top: 0}
    }
})

export default router