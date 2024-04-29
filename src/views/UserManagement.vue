<script setup>
import SectionMain from "@/components/Base/SectionMain.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TableSampleClients from "@/components/Table/TableSampleClients.vue";
import CardBox from "@/components/Card/CardBox.vue";
</script>

<template>
  <default-layout>
    <section-main>
      <card-box has-table>
        <TableSampleClients />
      </card-box>
    </section-main>
  </default-layout>
</template>
