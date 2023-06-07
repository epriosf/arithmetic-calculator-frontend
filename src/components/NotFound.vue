<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
const router = useRouter()
const goToHome = () => {
  router.push('/home')
}
</script>

<template>
  <div class="flex flex-column">
    <div class="flex align-items-center justify-content-center mt-8">
      <h1>Sorry, page not found</h1>
    </div>
    <div class="flex align-items-center justify-content-center mt-2">
      <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
    </div>
    <div class="flex align-items-center justify-content-center mt-2">
      <Button text @click="goToHome">Go to Home</Button>
    </div>
  </div>
</template>
