<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <div id="app">
    <TheHeader />
    <div class="main-content">
      <div class="flex">
        <TheSidebar />
        <div class="w-full">
          <RouterView />
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  paddding: 0;
}

.main-content {
  flex: 1;
}
</style>
