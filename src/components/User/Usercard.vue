<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiCheckDecagram } from '@mdi/js'
import PillTag from "@/components/Pill/PillTag.vue";
import CardBox from "@/components/Card/CardBox.vue";
import BaseLevel from "@/components/Base/Baselevel.vue";
import UserAvatarCurrentUser from "@/components/User/UserAvatarCurrentUser.vue";
import FormCheckRadio from "@/components/Forms/FormCheckRadio.vue";

const mainStore = useMainStore()

const userName = computed(() => mainStore.userName)

const userSwitchVal = ref(false)
</script>

<template>
  <card-box>
    <base-level type="justify-around lg:justify-center">
      <user-avatar-current-user class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
          <form-check-radio
            v-model="userSwitchVal"
            name="notifications-switch"
            type="switch"
            label="Notifications"
            :input-value="true"
          />
        </div>
        <h1 class="text-2xl">
          Howdy, <b>{{ userName }}</b
          >!
        </h1>
        <p>Last login <b>12 mins ago</b> from <b>127.0.0.1</b></p>
        <div class="flex justify-center md:block">
          <pill-tag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </base-level>
  </card-box>
</template>
