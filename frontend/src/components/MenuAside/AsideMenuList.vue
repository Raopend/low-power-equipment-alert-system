<script setup>

import AsideMenuItem from "@/components/MenuAside/AsideMenuItem.vue";

defineProps({
    isDropdownList: Boolean,
    menu: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
    emit('menu-click', event, item)
}
</script>

<template>
    <ul>
        <aside-menu-item
            v-for="(item, index) in menu"
            :key="index"
            :item="item"
            :is-dropdown-list="isDropdownList"
            @menu-click="menuClick"
        />
    </ul>
</template>
