<script setup>
import {use} from "echarts/core";
import {LineChart} from "echarts/charts";
import {GridComponent, LegendComponent, PolarComponent, TitleComponent, TooltipComponent} from "echarts/components";
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
  LineChart,
  PolarComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
]);

let mean = [];
let std = [];
let distances = [];
let XData = [];
let seriesData = new Array(6).fill(null).map(() => []);
let temperatureData = [];
let XData1 = [];
let YData1 = [];
let xdataIndex = 0;
let ydataIndex = 0;
let xdataIndex1 = 0;
let ydataIndex1 = 0;
let maxPoints = 100;

const option = ref({
  tooltip: {
    trigger: 'axis'
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
  series: Array.from({length: 6}, (_, i) => ({
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
  }))
});

const option1 = ref({
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: XData1,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: 'Distance',
      type: 'line',
      data: YData1,
      lineStyle: {
        color: 'blue',
        width: 3,
      },
      showSymbol: false, // 隐藏数据点
      smooth: true, // 线条平滑
    },
    {
      name: 'Mean',
      type: 'line',
      data: Array(XData1.length).fill(mean),
      showSymbol: false, // 隐藏数据点
      lineStyle: {color: 'green', type: 'dashed'}
    },
    {
      name: 'Upper Limit',
      type: 'line',
      showSymbol: false, // 隐藏数据点
      data: Array(XData1.length).fill(mean + 3 * std),
      lineStyle: {color: 'red', type: 'dashed'}
    },
    {
      name: 'Lower Limit',
      type: 'line',
      showSymbol: false, // 隐藏数据点
      data: Array(XData1.length).fill(mean - 3 * std),
      lineStyle: {color: 'red', type: 'dashed'}
    }
  ],
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

    // 更新图表
    option.value.xAxis.data = XData;
    option.value.series = seriesData.map((data, i) => ({
      ...option.value.series[i],
      data
    }));

    xdataIndex++;
    ydataIndex++;
  }
}

function addData1() {
  if (ydataIndex1 < distances.length) {
    XData1.push(xdataIndex1.toString()); // 使用数据点的索引作为X轴数据
    YData1.push(distances[ydataIndex]); // 添加新的Y轴数据点

    // 检查是否需要移除旧的数据点
    if (XData1.length > maxPoints) {
      XData1.shift(); // 移除数组最前面的元素
      YData1.shift(); // 移除数组最前面的元素
    }
    // 更新图表
    option1.value.xAxis.data = XData1;
    option1.value.series[0].data = YData1;
    option1.value.series[1].data = Array(XData1.length).fill(mean);
    option1.value.series[2].data = Array(XData1.length).fill(mean + 3 * std);
    option1.value.series[3].data = Array(XData1.length).fill(mean - 3 * std);

    xdataIndex1++;
    ydataIndex1++;
  }
}

onMounted(() => {
  try {
    axiosInstance.get("/check_U").then((response) => {
      mean = response.data.mean;
      std = response.data.std;
      distances = response.data.distances;
    });
  } catch (error) {
    console.error(error);
  }
  setInterval(addData, 1000);
  setInterval(addData1, 1000);
});

</script>

<template>
  <default-layout>
    <section-main>
      <section-title-line-with-button :icon="mdiSineWave" title="三相电流">
        <base-button color="whiteDark"/>
      </section-title-line-with-button>
      <CardBox class="mb-6 mt-4">
        <div>

        </div>
      </CardBox>

      <section-title-line-with-button
          :icon="mdiFlashTriangleOutline"
          title="三相电压"
      >
        <base-button color="whiteDark"/>
      </section-title-line-with-button>
      <CardBox class="mb-6 mt-4">
        <v-chart :option="option1" autoresize style="height: 400px"/>
      </CardBox>
    </section-main>
  </default-layout>
</template>
