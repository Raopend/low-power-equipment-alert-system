import {
  mdiMonitor,
  mdiCarBrakeAlert,
  mdiViewList,
  mdiPencilPlus,
} from "@mdi/js";

export default [
  {
    to: "/",
    icon: mdiMonitor,
    label: "主页",
  },
  {
    icon: mdiCarBrakeAlert,
    to: "/AddUser",
    icon: mdiPencilPlus,
    label: "添加用户",
  },
  {
    to: "/UserManagement",
    icon: mdiViewList,
    label: "用户管理",
  },
];
