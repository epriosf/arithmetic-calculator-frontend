
<template>
  <div class="card relative m-0">
    <Menubar class="border-0 bg-blue-900">
      <template #start>
        <div class="flex">
          <div class="flex align-items-center justify-content-center">
            <img alt="logo" src="https://primefaces.org/cdn/primevue/images/logo.svg" height="40" class="mr-2" />
          </div>
          <div class="flex align-items-center justify-content-center">
            <h2 class="text-white">Calculator System</h2>
          </div>
        </div>

      </template>
      <template #end>
        <Button type="button" label="UserName" icon="pi pi-users" severity="info" outlined class="text-white"/>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
</script>