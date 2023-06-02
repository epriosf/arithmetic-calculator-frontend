
<template>
  <div class="card flex justify-content-center my-menu">
    <Menu :model="items"/>
  </div>
</template>

<script setup>
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
<style scoped>
.my-menu {
  height: 700px;
}
</style>