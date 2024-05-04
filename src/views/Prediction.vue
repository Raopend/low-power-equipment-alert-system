<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import { mdiSineWave, mdiFlashTriangleOutline } from "@mdi/js";
import BaseButton from "@/components/Base/BaseButton.vue";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import CardBox from "@/components/Card/CardBox.vue";
import { onMounted, ref } from "vue";
import axiosInstance from "@/api/axiosInstance.js";
import { datasetObject } from "@/components/Charts/chart.config.js";

const chartData = ref({});

const fetchData = async () => {
  try {
    const response = await axiosInstance.get("/predict");
    let sequence = response.data.sequence;
    let predicted = response.data.predicted;
    chartData.value = response.data;
    chartData.value = {
      // labels 设置为元素个数
      labels: response.data.collection_time,
      datasets: [
        datasetObject("primary", "Ia", sequence),
        datasetObject("info", "predict", [
          NaN,
          NaN,
          NaN,
          NaN,
          sequence[sequence.length - 1],
          predicted,
        ]),
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

// 轮询查询
setInterval(() => {
  fetchData();
}, 5000);

onMounted(() => {
  fetchData();
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
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <section-title-line-with-button
        :icon="mdiFlashTriangleOutline"
        title="三相电压"
      >
        <base-button color="whiteDark" />
      </section-title-line-with-button>
      <CardBox class="mb-6 mt-4">
        <div>
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>
    </section-main>
  </default-layout>
</template>
