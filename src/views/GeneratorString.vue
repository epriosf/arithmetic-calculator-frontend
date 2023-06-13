<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { getRandomString } from '@/services/RandomStringService'
import { useAuthStore } from '@/stores/auth'

const randomString = ref('')
const isLoading = ref(false)
const errorRandomString = ref('')
const showContainer = ref(false)

const authStore = useAuthStore()
const user = computed(() => {
  return authStore.userDetail
})

const generateRandomString = async () => {
  const username = user.value.username
  const userBalance = user.value.user_balance
  const type = 'randomString'

  randomString.value = ''
  isLoading.value = true
  errorRandomString.value = ''
  showContainer.value = false
  try {
    const res = await getRandomString({
      username,
      userBalance,
      type
    })
    randomString.value = res.randomString
  } catch (error) {
    console.error('Error:', error)
    errorRandomString.value =
      error.message || 'The operation could not be finished. Please try it again later'
  }
  showContainer.value = true
  isLoading.value = false
}
</script>
<template>
  <div class="card flex align-items-center justify-content-center">
    <Card class="w-4 my-6">
      <template #header>
        <img alt="user header" src="../assets/card-header.png" class="w-full max-h-20rem mb-0" />
      </template>
      <template #title><h5 class="text-center mt-0">Random String Generator</h5></template>
      <template #subtitle> Source: https://www.random.org </template>
      <template #content>
        <p class="text-justify">
          The randomness comes from atmospheric noise, which for many purposes is better than the
          pseudo-random number algorithms typically used in computer programs.
        </p>
      </template>
      <template #footer>
        <Button label="Generate" class="w-full" @click="generateRandomString" />
        <div class="card-container" v-if="showContainer">
          <div class="text-start mt-4">Random string generated:</div>
          <Message
            v-show="randomString"
            severity="info"
            :closable="false"
            icon="pi pi-check-circle"
          >
            {{ randomString }}
          </Message>
          <Message v-show="errorRandomString" severity="error" :closable="false">
            {{ errorRandomString }}
          </Message>
          <p class="text-center">
            <i v-show="isLoading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

