<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import FormField from "@/components/Forms/FormField.vue";
import { reactive, ref } from "vue";
import { mdiAccount, mdiBallotOutline, mdiMail } from "@mdi/js";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import FormControl from "@/components/Forms/FormControl.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseButtons from "@/components/Base/BaseButtons.vue";
import FormCheckRadioGroup from "@/components/Forms/FormCheckRadioGroup.vue";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  token: "",
  subject: "",
  question: "",
});

const customElementsForm = reactive({
  checkbox: ["Ua", "Ub", "Uc", "Ia", "Ib", "Ic"],
});

const submit = () => {
  //
};

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};
</script>

<template>
  <default-layout>
    <section-main>
      <section-title-line-with-button
        :icon="mdiBallotOutline"
        title="添加用户"
        main
      >
      </section-title-line-with-button>
      <card-box form @submit.prevent="submit">
        <FormField label="用户信息">
          <form-control
            v-model="form.name"
            :icon="mdiAccount"
            placeholder="输入用户名"
          />
          <form-control
            v-model="form.email"
            type="email"
            :icon="mdiMail"
            placeholder="输入邮箱"
          />
        </FormField>

        <form-field label="电话" help="Do not enter the leading zero">
          <form-control
            v-model="form.phone"
            type="tel"
            placeholder="输入电话号码"
          />
        </form-field>

        <form-field label="预警选项">
          <form-check-radio-group
            v-model="customElementsForm.checkbox"
            name="sample-checkbox"
            :options="{
              Ua: 'Ua',
              Ub: 'Ub',
              Uc: 'Uc',
              Ia: 'Ia',
              Ib: 'Ib',
              Ic: 'Ic',
            }"
          />
        </form-field>

        <form-field label="推送密钥" help="推送加：https://www.pushplus.plus">
          <form-control
            v-model="form.phone"
            type="tel"
            placeholder="输入 token"
          />
        </form-field>

        <form-field label="备注" help="最多255个字符">
          <form-control type="textarea" placeholder="输入备注" />
        </form-field>

        <template #footer>
          <base-buttons>
            <base-button type="submit" color="info" label="Submit" />
            <base-button type="reset" color="info" outline label="Reset" />
          </base-buttons>
        </template>
      </card-box>
    </section-main>
  </default-layout>
</template>
