<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import {
    mdiAccountMultiple, mdiCartOutline,
    mdiChartTimelineVariant
} from "@mdi/js";
import CardBoxWidget from "@/components/Card/CardBoxWidget.vue";
</script>

<template>
    <default-layout>
        <section-main>
            <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Overview" main>
            </SectionTitleLineWithButton>

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
        </section-main>
    </default-layout>
</template>