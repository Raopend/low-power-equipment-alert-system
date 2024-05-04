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
      component: () => import("@/views/Home.vue"),
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
    {
      meta: {
        title: "参数预测",
      },
      path: "/Prediction",
      name: "Prediction",
      component: () => import("@/views/Prediction.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
