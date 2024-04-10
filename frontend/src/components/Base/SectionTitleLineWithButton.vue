<script setup>
import {useSlots, computed} from 'vue'
import IconRounded from "@/components/Base/IconRounded.vue";
import BaseIcon from "@/components/Base/BaseIcon.vue";
import BaseButton from "@/components/Base/BaseButton.vue";


defineProps({
    icon: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    main: Boolean
})

const hasSlot = computed(() => useSlots().default)
</script>

<template>
    <section :class="{ 'pt-6': !main }" class="mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
            <icon-rounded v-if="icon && main" :icon="icon" color="light" class="mr-3" bg/>
            <base-icon v-else-if="icon" :path="icon" class="mr-2" size="20"/>
            <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
                {{ title }}
            </h1>
        </div>
        <slot v-if="hasSlot"/>
    </section>
</template>
