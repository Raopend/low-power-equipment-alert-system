<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import {mdiCartOutline, mdiChartPie, mdiChartTimelineVariant, mdiReload} from "@mdi/js";
import CardBoxWidget from "@/components/Card/CardBoxWidget.vue";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import CardBox from "@/components/Card/CardBox.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import FormField from "@/components/Forms/FormField.vue";
import FormControl from "@/components/Forms/FormControl.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import moment from "moment";
import axiosInstance from "@/api/axiosInstance.js";
import {datasetObject} from "@/components/Charts/chart.config.js";

const stateData = ref({
    Ia: null,
    Ib: null,
    Ic: null,
    Ua: null,
    Ub: null,
    Uc: null,
    P: null,
    COS: null,
    elec_degree: null,
    collection_time: null
});
const dateIValue = ref({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
});
const dateUValue = ref({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
});
const formatter = ref({
    date: 'YYYY-MM-DD',
    month: 'MMM',
});

const selectOptions = [
    {id: 1, label: '1 day'},
    {id: 2, label: '1 hour'},
    {id: 3, label: '30 minutes'}
];

const formI = reactive({
    timeRange: dateIValue,
    interval: selectOptions[0],
});

const formU = reactive({
    timeRange: dateUValue,
    interval: selectOptions[0],
});

let ws = null;

const chartIData = ref({});
const chartUData = ref({});


const fillIChartData = async () => {
    const params = {
        start_time: dateIValue.value.startDate,
        end_time: dateIValue.value.endDate,
        interval: formI.interval.label
    };

    try {
        const response = await axiosInstance.post('http://localhost:8000/query/equipment_I_trend', params);
        chartIData.value = {
            labels: response.data.map(item => item.collection_time),
            datasets: [
                datasetObject('primary', 'Ia', response.data.map(item => item.Ia)),
                datasetObject('info', 'Ib', response.data.map(item => item.Ib)),
                datasetObject('danger', 'Ic', response.data.map(item => item.Ic))
            ]
        }
    } catch (error) {
        console.error(error);
    }
}

const fillUChartData = async () => {
    const params = {
        start_time: dateUValue.value.startDate,
        end_time: dateUValue.value.endDate,
        interval: formU.interval.label
    };

    try {
        const response = await axiosInstance.post('http://localhost:8000/query/equipment_U_trend', params);
        chartUData.value = {
            labels: response.data.map(item => item.collection_time),
            datasets: [
                datasetObject('primary', 'Ua', response.data.map(item => item.Ua)),
                datasetObject('info', 'Ub', response.data.map(item => item.Ub)),
                datasetObject('danger', 'Uc', response.data.map(item => item.Uc))
            ]
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    ws = new WebSocket('ws://localhost:8000/ws/equipment_state');

    ws.onmessage = (event) => {
        stateData.value = JSON.parse(event.data).data;
        console.log(stateData.value);
    }

    ws.onclose = () => console.log("WebSocket connection closed");
    ws.onerror = (error) => console.error("WebSocket error:", error);

    setInterval(() => {
        if (ws.readyState === ws.OPEN)
            ws.send("ping");
    }, 1000);

    // 断线重连
    setInterval(() => {
        if (ws.readyState === ws.CLOSED) {
            ws = new WebSocket('ws://localhost:8000/ws/equipment_state');
        }
    }, 5000);

    fillIChartData();
    fillUChartData();
});

onBeforeUnmount(() => {
    if (ws) ws.close();
});
</script>

<template>
    <default-layout>
        <section-main>
            <section-title-line-with-button :icon="mdiChartTimelineVariant" title="设备状态">
                <p>采集时间 {{ stateData.collection_time }}</p>
            </section-title-line-with-button>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                <card-box-widget
                    color="text-blue-500"
                    :icon="mdiCartOutline"
                    :number="stateData.Ia"
                    :suffix="`A`"
                    label="Ia"
                />
                <card-box-widget
                    color="text-blue-500"
                    :icon="mdiCartOutline"
                    :number="stateData.Ib"
                    :suffix="`A`"
                    label="Ib"
                />
                <card-box-widget
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="stateData.Ic"
                    :suffix="`A`"
                    label="Ic"
                />
                <card-box-widget
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="stateData.Ua"
                    suffix="U"
                    label="Ua"
                />
                <card-box-widget
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="stateData.Ub"
                    suffix="U"
                    label="Ub"
                />
                <card-box-widget
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="stateData.Uc"
                    suffix="U"
                    label="Uc"
                />
                <card-box-widget
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="stateData.P"
                    label="P"
                />
                <card-box-widget
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="stateData.COS"
                    label="COS"
                />
                <card-box-widget
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="stateData.elec_degree"
                    suffix="d"
                    label="elec_degree"
                />
            </div>

            <section-title-line-with-button :icon="mdiChartPie" title="电流趋势">
                <base-button :icon="mdiReload" color="whiteDark" @click="fillIChartData"/>
            </section-title-line-with-button>
            <CardBox class="mb-6 mt-4">
                <form-field label="">
                    <vue-tailwind-datepicker v-model="dateIValue" :formatter="formatter"/>
                    <form-control v-model="formI.interval" :options="selectOptions"/>
                </form-field>
                <div v-if="chartIData">
                    <line-chart :data="chartIData" class="h-96"/>
                </div>
            </CardBox>

            <section-title-line-with-button :icon="mdiChartPie" title="电压趋势">
                <base-button :icon="mdiReload" color="whiteDark" @click="fillUChartData"/>
            </section-title-line-with-button>
            <CardBox class="mb-6 mt-4">
                <form-field label="">
                    <vue-tailwind-datepicker v-model="dateUValue" :formatter="formatter"/>
                    <form-control v-model="formU.interval" :options="selectOptions"/>
                </form-field>
                <div v-if="chartUData">
                    <line-chart :data="chartUData" class="h-96"/>
                </div>
            </CardBox>
        </section-main>
    </default-layout>
</template>