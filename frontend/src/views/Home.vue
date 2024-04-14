<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import {mdiCartOutline, mdiChartPie, mdiChartTimelineVariant} from "@mdi/js";
import CardBoxWidget from "@/components/Card/CardBoxWidget.vue";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import CardBox from "@/components/Card/CardBox.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import * as chartConfig from '@/components/Charts/chart.config.js'
import FormField from "@/components/Forms/FormField.vue";
import FormControllcon from "@/components/Forms/FormControllcon.vue";
import FormControl from "@/components/Forms/FormControl.vue";

const selectOptions = [
    {id: 1, label: '按天'},
    {id: 2, label: '按小时'},
    {id: 3, label: '按分钟'}
];

const form = reactive({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '',
    department: selectOptions[0],
    subject: '',
    question: ''
});

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
const dateValue = ref([]);
const formatter = ref({
    date: 'DD MMM YYYY',
    month: 'MMM',
})
let ws = null;

const chartData = ref(null)

const fillChartData = () => {
    chartData.value = chartConfig.sampleChartData()
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
    ws.onclose = () => {
        console.log('WebSocket connection closed. Reconnecting...');
        ws = new WebSocket('ws://localhost:8000/ws/equipment_state');
    };

    fillChartData()
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
            </section-title-line-with-button>
            <CardBox class="mb-6 mt-4">
                <form-field label="">
                    <vue-tailwind-datepicker v-model="dateValue" :formatter="formatter"/>
                    <form-control v-model="form.department" :options="selectOptions"/>
                </form-field>
                <div v-if="chartData">
                    <line-chart :data="chartData" class="h-96"/>
                </div>
            </CardBox>

            <section-title-line-with-button :icon="mdiChartPie" title="电压趋势">
            </section-title-line-with-button>
            <CardBox class="mb-6 mt-4">
                <form-field label="">
                    <vue-tailwind-datepicker v-model="dateValue" :formatter="formatter"/>
                    <form-control v-model="form.department" :options="selectOptions"/>
                </form-field>
                <div v-if="chartData">
                    <line-chart :data="chartData" class="h-96"/>
                </div>
            </CardBox>
        </section-main>
    </default-layout>
</template>