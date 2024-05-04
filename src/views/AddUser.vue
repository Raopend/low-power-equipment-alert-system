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
import { addUser } from "@/api/user.js";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

const form = reactive({
  username: "",
  email: "",
  phone: "",
  alert_option: ["Ua", "Ub", "Uc", "Ia", "Ib", "Ic"],
  token: "",
  notes: "",
});

const submit = () => {
  try {
    addUser({
      ...form,
      alert_option: form.alert_option.join(","),
    });
    formStatusSubmit();

    // 清空表单
    clear();
    notify({
      type: "success",
      title: "Success",
      text: "添加用户成功",
    });
  } catch (error) {
    console.error(error);
    formStatusCurrent.value = 2;
  }
};

const clear = () => {
  form.username = "";
  form.email = "";
  form.phone = "";
  form.alert_option = ["Ua", "Ub", "Uc", "Ia", "Ib", "Ic"];
  form.token = "";
  form.notes = "";
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
      <section-title-line-with-button title="添加预警" main>
      </section-title-line-with-button>
      <card-box form>
        <FormField label="用户信息">
          <form-control
            v-model="form.username"
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
            v-model="form.alert_option"
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
            v-model="form.token"
            type="tel"
            placeholder="输入 token"
          />
        </form-field>

        <form-field label="备注" help="最多255个字符">
          <form-control
            v-model="form.notes"
            type="textarea"
            placeholder="输入备注"
          />
        </form-field>

        <template #footer>
          <base-buttons>
            <base-button
              type="submit"
              color="info"
              label="Submit"
              @click="submit"
            />
            <base-button
              type="reset"
              color="info"
              outline
              label="Reset"
              @click="clear"
            />
          </base-buttons>
        </template>
      </card-box>
    </section-main>
  </default-layout>
</template>
