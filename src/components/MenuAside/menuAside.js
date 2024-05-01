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
    label: "添加预警",
  },
  {
    to: "/UserManagement",
    icon: mdiViewList,
    label: "用户管理",
  },
];
