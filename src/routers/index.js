import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      meta: {
        title: "主页",
      },
      path: "/",
      name: "Home",
      component: () => import("@/views/test.vue"),
    },
    {
      meta: {
        title: "添加用户",
      },
      path: "/AddUser",
      name: "AddUser",
      component: () => import("@/views/AddUser.vue"),
    },
    {
      meta: {
        title: "用户管理",
      },
      path: "/UserManagement",
      name: "UserManagement",
      component: () => import("@/views/UserManagement.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
