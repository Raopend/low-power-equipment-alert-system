<script setup>
import { useMainStore } from "@/stores/main";
import UserAvatar from "@/components/User/UserAvatar.vue";

const mainStore = useMainStore();
</script>

<template>
  <user-avatar :username="mainStore.userName" :avatar="mainStore.userAvatar">
    <slot />
  </user-avatar>
</template>
