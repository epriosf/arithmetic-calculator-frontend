<script setup lang="ts">
import { ref } from "vue";
import Menu from 'primevue/menu';
const items = ref([
  {
    items: [
      {
        label: 'Home',
        icon: 'pi pi-home',
        to: '/',
        class: 'mt-6'
      },
      {
        label: 'Operations',
        icon: 'pi pi-calculator',
        to: '/mathOperations',
        class: 'my-6'
      },
      {
        label: 'String Generator',
        icon: 'pi pi-bolt',
        to: '/generatorString',
        class: 'my-6'
      },
      {
        label: 'User Records',
        icon: 'pi pi-list',
        to: '/userRecords',
        class: 'mb-6'
      }
    ]
  }
]);
</script>

<template>
  <div class="card flex justify-content-center h-full">
    <Menu :model="items"/>
  </div>
</template>