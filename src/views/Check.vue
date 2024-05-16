<script setup>
import {use} from "echarts/core";
import {BarChart, LineChart, PieChart} from "echarts/charts";
import {GridComponent, LegendComponent, PolarComponent, TitleComponent, TooltipComponent,} from "echarts/components";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import CardBox from "@/components/Card/CardBox.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import {mdiFlashTriangleOutline, mdiSineWave} from "@mdi/js";
import VChart from "vue-echarts";
import {CanvasRenderer} from "echarts/renderers";
import {onMounted, ref} from "vue";
import axiosInstance from "@/api/axiosInstance.js";

use([
  PieChart,
  BarChart,
  LineChart,
  PolarComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
]);

let seriesData = new Array(6).fill(null).map(() => []);
let temperatureData = new Array(6).fill(null).map(() => []);
let XData = [];
let xdataIndex = 0; // 用于追踪当前添加到图表中的数据点索引
let ydataIndex = 0; // 用于追踪当前添加到图表中的数据点索引
let maxPoints = 50; // 图表上最大显示的数据点数

onMounted(() => {
  try {
    axiosInstance.get("/check_U").then((response) => {
      temperatureData = response.data;
    });
  } catch (error) {
    console.error(error);
  }
  setInterval(addData, 1000);
});

function addData() {
  if (ydataIndex < temperatureData.length) {
    XData.push(String(xdataIndex));
    temperatureData[ydataIndex].forEach((value, i) => {
      seriesData[i].push(value);
    });

    // 检查是否需要移除旧的数据点
    if (XData.length > maxPoints) {
      XData.shift();
      seriesData.forEach(arr => arr.shift());
    }

    option.value = {
      xAxis: {
        data: XData,
      },
      series: seriesData.map((data, i) => ({
        data,
      })),
    };

    xdataIndex++;
    ydataIndex++;
  }
}

const option = ref({
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: XData
  },
  yAxis: {
    type: 'value',
    min: 12,  // 设置Y轴的最小值
    max: 24,  // 设置Y轴的最大值
  },
  series: Array.from({ length: 6 }, (_, i) => (
    {
      name: `温度特征${i + 1}`,
      type: 'line',
      smooth: true,
      showSymbol: false, // 隐藏数据点
      lineStyle: {
          width: 3,
          type: i % 2 === 0 ? 'solid' : 'dashed', // 交替使用实线和虚线
      },
      emphasis: {
          focus: 'series'
      },
      data: seriesData[i]
    }
  )),
});


</script>

<template>
  <default-layout>
    <section-main>
      <section-title-line-with-button :icon="mdiSineWave" title="三相电流">
        <base-button color="whiteDark" />
      </section-title-line-with-button>
      <CardBox class="mb-6 mt-4">
        <div>

        </div>
      </CardBox>

      <section-title-line-with-button
        :icon="mdiFlashTriangleOutline"
        title="三相电压"
      >
        <base-button color="whiteDark" />
      </section-title-line-with-button>
      <CardBox class="mb-6 mt-4">
          <v-chart :option="option" autoresize style="height: 400px"/>
      </CardBox>
    </section-main>
  </default-layout>
</template>
