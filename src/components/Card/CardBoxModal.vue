<script setup>
import { computed } from "vue";
import { mdiClose } from "@mdi/js";
import OverlayLayer from "@/components/MenuAside/OverlayLayer.vue";
import CardBox from "@/components/Card/CardBox.vue";
import CardBoxComponentTitle from "@/components/Card/CardBoxComponentTitle.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseButtons from "@/components/Base/BaseButtons.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Done",
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
  }
});
</script>

<template>
  <overlay-layer v-show="value" @overlay-click="cancel">
    <card-box
      v-show="value"
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50"
      is-modal
    >
      <card-box-component-title :title="title">
        <base-button
          v-if="hasCancel"
          :icon="mdiClose"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        />
      </card-box-component-title>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <base-buttons>
          <base-button :label="buttonLabel" :color="button" @click="confirm" />
          <base-button
            v-if="hasCancel"
            label="取消"
            :color="button"
            outline
            @click="cancel"
          />
        </base-buttons>
      </template>
    </card-box>
  </overlay-layer>
</template>
