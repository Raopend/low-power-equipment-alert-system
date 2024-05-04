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

const chartIData = ref({});
const chartUData = ref({});

const fetchIData = async () => {
  try {
    const response = await axiosInstance.get("/predict_I");
    let Ia = response.data.Ia;
    let Ib = response.data.Ib;
    let Ic = response.data.Ic;
    let predicted = response.data.predicted;
    let predict_data = new Array(11).fill(NaN);
    predict_data.push(Ia[Ia.length - 1]);
    predict_data.push(predicted);
    chartIData.value = response.data;
    chartIData.value = {
      // labels 设置为元素个数
      labels: response.data.collection_time,
      datasets: [
        datasetObject("primary", "Ia", Ia),
        datasetObject("danger", "Ib", Ib),
        datasetObject("info", "Ic", Ic),
        datasetObject("success", "predict", predict_data),
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

const fetchUData = async () => {
  try {
    const response = await axiosInstance.get("/predict_U");
    let Ua = response.data.Ua;
    let Ub = response.data.Ub;
    let Uc = response.data.Uc;
    let predicted = response.data.predicted;
    let predict_data = new Array(11).fill(NaN);
    predict_data.push(Ua[Ua.length - 1]);
    predict_data.push(predicted);
    chartUData.value = response.data;
    chartUData.value = {
      // labels 设置为元素个数
      labels: response.data.collection_time,
      datasets: [
        datasetObject("primary", "Ua", Ua),
        datasetObject("danger", "Ub", Ub),
        datasetObject("info", "Uc", Uc),
        datasetObject("success", "predict", predict_data),
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

// 轮询查询
setInterval(() => {
  fetchIData();
  fetchUData();
}, 900000);

onMounted(() => {
  fetchIData();
  fetchUData();
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
          <line-chart :data="chartIData" class="h-96" />
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
          <line-chart :data="chartUData" class="h-96" />
        </div>
      </CardBox>
    </section-main>
  </default-layout>
</template>
