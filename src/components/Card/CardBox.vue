<script setup>
import { computed, useSlots } from "vue";
import CardBoxComponentBody from "@/components/Card/CardBoxComponentBody.vue";
import CardBoxComponentFooter from "@/components/Card/CardBoxComponentFooter.vue";

const props = defineProps({
  rounded: {
    type: String,
    default: "rounded-2xl",
  },
  flex: {
    type: String,
    default: "flex-col",
  },
  hasComponentLayout: Boolean,
  hasTable: Boolean,
  isForm: Boolean,
  isHoverable: Boolean,
  isModal: Boolean,
});

const emit = defineEmits(["submit"]);

const slots = useSlots();

const hasFooterSlot = computed(() => slots.footer && !!slots.footer());

const componentClass = computed(() => {
  const base = [
    props.rounded,
    props.flex,
    props.isModal ? "dark:bg-slate-900" : "dark:bg-slate-900/70",
  ];

  if (props.isHoverable) {
    base.push("hover:shadow-lg transition-shadow duration-500");
  }

  return base;
});

const submit = (event) => {
  emit("submit", event);
};
</script>

<template>
  <component
    :is="isForm ? 'form' : 'div'"
    :class="componentClass"
    class="bg-white flex"
    @submit="submit"
  >
    <slot v-if="hasComponentLayout" />
    <template v-else>
      <card-box-component-body :no-padding="hasTable">
        <slot />
      </card-box-component-body>
      <card-box-component-footer v-if="hasFooterSlot">
        <slot name="footer" />
      </card-box-component-footer>
    </template>
  </component>
</template>
