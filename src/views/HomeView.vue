<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => {
  return authStore.userDetail;
})
</script>

<template>
  <div v-if="user">
    <h1 class="m-6">Welcome to the System,</h1>
    <h2 class="m-6">{{user.username}} </h2>
    <h2 class="m-6">{{user.user_balance}} </h2>
  </div>
</template>
