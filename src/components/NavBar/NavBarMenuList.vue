<script setup>
import NavBarItem from "@/components/NavBar/NavBarItem.vue";

defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["menu-click"]);

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};
</script>

<template>
  <nav-bar-item
    v-for="(item, index) in menu"
    :key="index"
    :item="item"
    @menu-click="menuClick"
  />
</template>
