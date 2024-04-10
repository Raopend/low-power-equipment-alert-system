<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import {
    mdiAccountMultiple, mdiCartOutline, mdiChartPie,
    mdiChartTimelineVariant, mdiReload
} from "@mdi/js";
import CardBoxWidget from "@/components/Card/CardBoxWidget.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import {onMounted, ref} from "vue";
import * as chartConfig from '@/components/Charts/chart.config.js'
import CardBox from "@/components/Card/CardBox.vue";
import LineChart from "@/components/Charts/LineChart.vue";

const chartData = ref(null)

const fillChartData = () => {
    chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
    fillChartData()
})
</script>

<template>
    <default-layout>
        <section-main>
            <section-title-line-with-button :icon="mdiChartTimelineVariant" title="Trends overview">
            </section-title-line-with-button>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                <card-box-widget
                    trend="12%"
                    trend-type="up"
                    color="text-emerald-500"
                    :icon="mdiAccountMultiple"
                    :number="512"
                    label="Clients"
                />
                <card-box-widget
                    trend="12%"
                    trend-type="down"
                    color="text-blue-500"
                    :icon="mdiCartOutline"
                    :number="7770"
                    prefix="$"
                    label="Sales"
                />
                <card-box-widget
                    trend="Overflow"
                    trend-type="alert"
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="256"
                    suffix="%"
                    label="Performance"
                />
            </div>

            <section-title-line-with-button :icon="mdiChartPie" title="Trends overview">
                <base-button :icon="mdiReload" color="whiteDark" @click="fillChartData"/>
            </section-title-line-with-button>

            <card-box class="mb-6">
                <div v-if="chartData">
                    <line-chart :data="chartData" class="h-96"/>
                </div>
            </card-box>
        </section-main>
    </default-layout>
</template>