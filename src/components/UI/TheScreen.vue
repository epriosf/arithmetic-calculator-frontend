<script setup lang="ts">
defineProps({
  enteredInput: String,
  isLoading: Boolean,
});
</script>
<template>
  <div className="bg-cyan-500 text-white text-center border-round py-1 h-4rem">
    <p class="text-lg">
      {{ enteredInput }}
    </p>
    <p class="text-center">
      <i v-show="isLoading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </p>
  </div>
</template>
