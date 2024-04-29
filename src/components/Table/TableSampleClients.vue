<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {mdiAccount, mdiMail, mdiPencil, mdiTrashCan} from "@mdi/js";
import CardBoxModal from "@/components/Card/CardBoxModal.vue";
import UserAvatar from "@/components/User/UserAvatar.vue";
import BaseButtons from "@/components/Base/BaseButtons.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseLevel from "@/components/Base/Baselevel.vue";
import FormField from "@/components/Forms/FormField.vue";
import FormCheckRadioGroup from "@/components/Forms/FormCheckRadioGroup.vue";
import FormControl from "@/components/Forms/FormControl.vue";
import CardBox from "@/components/Card/CardBox.vue";

defineProps({
  checkable: Boolean,
});

const mainStore = useMainStore();

const items = computed(() => mainStore.clients);

// 显示编辑模态框
const isEditModalActive = ref(false);
const editingClient = ref({
  id: "",
  name: "",
  company: "",
  city: "",
  created: "",
});
const showEditModal = (client) => {
  editingClient.value = { ...client }; // 创建当前编辑的客户的副本
  isEditModalActive.value = true;
};
const saveChanges = () => {
  const index = mainStore.clients.findIndex(
    (c) => c.id === editingClient.value.id
  );
  if (index !== -1) {
    mainStore.clients[index] = editingClient.value;
  }
  isEditModalActive.value = false;
};

// 显示删除模态框
const isDeleteModalActive = ref(false);
const candidateForDeletion = ref(null);
const showDeleteModal = (client) => {
  candidateForDeletion.value = client.id; // 设置当前预备删除的用户ID
  isDeleteModalActive.value = true; // 显示模态框
};
const confirmDeletion = () => {
  if (candidateForDeletion.value) {
    mainStore.clients = mainStore.clients.filter(
      (client) => client.id !== candidateForDeletion.value
    );
    candidateForDeletion.value = null;
  }
  isDeleteModalActive.value = false; // 关闭模态框
};
const cancelDeletion = () => {
  candidateForDeletion.value = null;
  isDeleteModalActive.value = false;
};

const perPage = ref(10);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};
</script>

<template>
  <card-box-modal
    v-model="isEditModalActive"
    title="编辑用户信息"
    button="primary"
    buttonLabel="Save Changes"
    has-cancel
    @confirm="saveChanges"
    @cancel="() => (isEditModalActive = false)"
    class="w-full h-full"
  >
<card-box>
        <FormField label="用户信息">
          <form-control
            v-model="editingClient.name"
            :icon="mdiAccount"
            placeholder="输入用户名"
          />
          <form-control
            v-model="editingClient.email"
            type="email"
            :icon="mdiMail"
            placeholder="输入邮箱"
          />
        </FormField>
        <form-field label="电话" help="Do not enter the leading zero">
          <form-control
            v-model="editingClient.city"
            type="tel"
            placeholder="输入电话号码"
          />
        </form-field>
        <form-field label="推送密钥" help="推送加：https://www.pushplus.plus">
          <form-control
            v-model="editingClient.created"
            type="tel"
            placeholder="输入 token"
          />
        </form-field>
      </card-box>
  </card-box-modal>

  <card-box-modal
    v-model="isDeleteModalActive"
    title="确认删除"
    button="danger"
    buttonLabel="Delete"
    has-cancel
    @confirm="confirmDeletion"
    @cancel="cancelDeletion"
  >
  </card-box-modal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>姓名</th>
        <th>邮箱</th>
        <th>电话</th>
        <th>创建日期</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <table-sample-clients
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          <user-avatar
            :username="client.name"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="Name">
          {{ client.name }}
        </td>
        <td data-label="Company">
          {{ client.company }}
        </td>
        <td data-label="City">
          {{ client.city }}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="client.created"
            >{{ client.created }}</small
          >
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <base-buttons type="justify-start lg:justify-end" no-wrap>
            <base-button
              color="info"
              :icon="mdiPencil"
              small
              @click="showEditModal(client)"
            />
            <base-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="showDeleteModal(client)"
            />
          </base-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <base-level>
      <base-buttons>
        <base-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </base-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </base-level>
  </div>
</template>
