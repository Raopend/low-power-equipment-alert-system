<script setup>
import SectionMain from "@/components/Base/SectionMain.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TableSampleClients from "@/components/Table/TableSampleClients.vue";
import CardBox from "@/components/Card/CardBox.vue";
import {mdiBallotOutline} from "@mdi/js";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
</script>

<template>
  <default-layout>
    <section-main>
      <section-title-line-with-button
        title="用户管理"
        main
      >
      </section-title-line-with-button>
      <card-box has-table>
        <TableSampleClients />
      </card-box>
    </section-main>
  </default-layout>
</template>
