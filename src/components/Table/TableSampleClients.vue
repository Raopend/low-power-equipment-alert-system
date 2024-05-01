<script setup>
import {computed, onBeforeMount, ref} from "vue";
import { mdiAccount, mdiMail, mdiPencil, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/Card/CardBoxModal.vue";
import UserAvatar from "@/components/User/UserAvatar.vue";
import BaseButtons from "@/components/Base/BaseButtons.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseLevel from "@/components/Base/Baselevel.vue";
import FormField from "@/components/Forms/FormField.vue";
import FormControl from "@/components/Forms/FormControl.vue";
import CardBox from "@/components/Card/CardBox.vue";
import { fetchAllUsers, deleteUser, updateUser } from "@/api/user.js";

defineProps({
  checkable: Boolean,
});

// 从API获取用户数据，并分页
const items = ref([]);
// 每页显示的用户数
const perPage = ref(10);
// 当前页
const currentPage = ref(0);
// 选中的行
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
// 保存修改
const saveChanges = async () => {
  await updateUser(editingClient.value.id, editingClient.value);
  items.value = items.value.map((client) => {
    if (client.id === editingClient.value.id) {
      return { ...editingClient.value };
    }
    return client;
  });
  isEditModalActive.value = false;
};

// 显示编辑模态框
const isEditModalActive = ref(false);
const editingClient = ref({
  id: "",
  username: "",
  email: "",
  phone: "",
  token: "",
});
const showEditModal = (client) => {
  editingClient.value = { ...client }; // 创建当前编辑的客户的副本
  isEditModalActive.value = true;
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
    deleteUser(candidateForDeletion.value);
    items.value = items.value.filter(
      (client) => client.id !== candidateForDeletion.value
    );
  }
  isDeleteModalActive.value = false; // 关闭模态框
};
const cancelDeletion = () => {
  candidateForDeletion.value = null;
  isDeleteModalActive.value = false;
};
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

onBeforeMount(async () => {
  items.value = await fetchAllUsers();
});
</script>

<template>
  <card-box-modal
    v-model="isEditModalActive"
    title="编辑用户信息"
    button="primary"
    buttonLabel="保存修改"
    has-cancel
    @confirm="saveChanges"
    @cancel="() => (isEditModalActive = false)"
    class="w-full h-full"
  >
    <card-box>
      <FormField label="用户信息">
        <form-control
          v-model="editingClient.username"
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
          v-model="editingClient.phone"
          type="tel"
          placeholder="输入电话号码"
        />
      </form-field>
      <form-field label="推送密钥" help="推送加：https://www.pushplus.plus">
        <form-control
          v-model="editingClient.token"
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
            :username="client.username"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="Username">
          {{ client.username }}
        </td>
        <td data-label="Email">
          {{ client.email }}
        </td>
        <td data-label="Phone">
          {{ client.phone }}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="client.created_at"
            >{{ client.created_at }}</small
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
