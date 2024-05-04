import {
  mdiMonitor,
  mdiCarBrakeAlert,
  mdiViewList,
  mdiChartArc,
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
  {
    to: "/Prediction",
    icon: mdiChartArc,
    label: "参数预测",
  },
];
