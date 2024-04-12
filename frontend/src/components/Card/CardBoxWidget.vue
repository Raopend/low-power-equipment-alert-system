<script setup>
import {mdiCog} from '@mdi/js'
import BaseLevel from "@/components/Base/Baselevel.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseIcon from "@/components/Base/BaseIcon.vue";
import NumberDynamic from "@/components/Card/NumberDynamic.vue";
import CardBox from "@/components/Card/CardBox.vue";
import PillTagTrend from "@/components/Pill/PillTagTrend.vue";

defineProps({
    number: {
        type: Number,
        default: 0
    },
    icon: {
        type: String,
        default: null
    },
    prefix: {
        type: String,
        default: null
    },
    suffix: {
        type: String,
        default: null
    },
    label: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: null
    },
    trend: {
        type: String,
        default: null
    },
    trendType: {
        type: String,
        default: null
    }
})
</script>

<template>
    <card-box>
        <base-level mobile>
            <div>
                <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
                    {{ label }}
                </h3>
                <h1 class="text-3xl leading-tight font-semibold">
                    <number-dynamic :value="number" :prefix="prefix" :suffix="suffix"/>
                </h1>
            </div>
            <base-icon v-if="icon" :path="icon" size="48" w="" h="h-16" :class="color"/>
        </base-level>
    </card-box>
</template>
