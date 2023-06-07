<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheSidebar from "@/components/TheSidebar.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <TheHeader />
  <div class="flex">
    <TheSidebar />
    <div class="w-full">
      <RouterView />
    </div>
  </div>
  <TheFooter />
</template>