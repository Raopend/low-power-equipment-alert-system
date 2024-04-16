<script setup>
import {ref, watch, computed, onMounted} from 'vue';
import {
    Chart,
    LineElement,
    PointElement,
    LineController,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const root = ref(null);

let chart;

Chart.register(LineElement, PointElement, LineController, LinearScale, CategoryScale, Tooltip, Legend);

onMounted(() => {
    chart = new Chart(root.value, {
        type: 'line',
        data: props.data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    // type: 'timeseries'
                },
                y: {
                    display: false,
                }
            }
        }
    })
});

const chartData = computed(() => props.data);

watch(chartData, (data) => {
    if (chart) {
        chart.data = data
        chart.update()
    }
});
</script>

<template>
    <canvas ref="root"/>
</template>
