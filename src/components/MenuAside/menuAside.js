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
    label: "Home",
  },
  {
    icon: mdiCarBrakeAlert,
    label: "Alert",
    menu: [
      {
        to: "/AddUser",
        icon: mdiPencilPlus,
        label: "添加用户",
      },
      {
        to: "/UserManagement",
        icon: mdiViewList,
        label: "用户管理",
      },
    ],
  },
];
