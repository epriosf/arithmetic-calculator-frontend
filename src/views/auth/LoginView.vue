<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InlineMessage from 'primevue/inlinemessage'
import { reactive, ref } from 'vue'
import { LoginData, useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  username: '',
  password: ''
})
const userNameValidity = ref('pending')
const validateUsername = () => {
  if (loginData.username === '' || !/^[^@]+@\w+(\.\w+)+\w$/.test(loginData.username)) {
    userNameValidity.value = 'invalid'
  } else {
    userNameValidity.value = 'valid'
  }
}
const passwordValidity = ref('pending')
const validatePassword = () => {
  if (loginData.password === '' || loginData.password.length < 4) {
    passwordValidity.value = 'invalid'
  } else {
    passwordValidity.value = 'valid'
  }
}

async function submit() {
  await authStore
    .login(loginData)
    .then(() => {
      router.replace({ name: 'home' })
    })
    .catch((err) => {
      console.log(err.message)
    })
}
</script>

<template>
  <div class="grid">
    <div class="col"></div>
    <div class="col mt-8">
      <form @submit.prevent="submit">
        <Card>
          <template #content>
            <span class="p-float-label mt-5">
              <InputText
                id="username"
                class="w-full"
                v-model.trim="loginData.username"
                @blur="validateUsername"
                required
              />
              <label for="username">Email</label>
            </span>
            <InlineMessage class="w-full mt-1" v-if="userNameValidity === 'invalid'"
              >Please enter a valid email</InlineMessage
            >
            <span class="p-float-label mt-5">
              <InputText
                id="password"
                class="w-full"
                v-model="loginData.password"
                @blur="validatePassword"
                required
              />
              <label for="password">Password</label>
            </span>
            <InlineMessage class="w-full mt-1" v-if="passwordValidity === 'invalid'"
              >Password min length: 4</InlineMessage
            >
          </template>
          <template #footer>
            <Button
              label="Sign In"
              icon="pi pi-arrow-right"
              iconPos="right"
              class="w-full mb-5"
              type="submit"
            />
          </template>
        </Card>
      </form>
    </div>
    <div class="col"></div>
  </div>
</template>
