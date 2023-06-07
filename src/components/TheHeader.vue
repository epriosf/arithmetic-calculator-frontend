<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import { computed, ref } from 'vue'
const authStore = useAuthStore()
const router = useRouter()
const menu = ref()
const items = ref([
  { label: 'Status:', icon: 'pi pi-fw pi-info-circle', disabled: true },
  { label: 'Amount:', icon: 'pi pi-fw pi-money-bill', disabled: true },
  { separator: true }
])

const user = computed(() => {
  return authStore.user
})

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated
})

const toggle = (event) => {
  menu.value.toggle(event)
}

async function logout() {
  await authStore
    .logout()
    .then(() => {
      router.replace({ name: 'login' })
    })
    .catch((err) => {
      console.log(err.message)
    })
}
</script>

<template>
  <div class="card relative m-0">
    <Menubar class="border-0 bg-blue-900">
      <template #start>
        <div class="flex">
          <div class="flex align-items-center justify-content-center">
            <img
              alt="logo"
              src="https://primefaces.org/cdn/primevue/images/logo.svg"
              height="40"
              class="mr-2"
            />
          </div>
          <div class="flex align-items-center justify-content-center">
            <h2 class="text-white">Calculator System</h2>
          </div>
        </div>
      </template>
      <template #end v-if="isAuthenticated">
        <Button
          type="button"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          class="text-white"
          outlined
        >
          <i class="pi pi-fw pi-user" />
          <span class="ml-2">{{ user.username }}</span>
        </Button>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="mt-2">
          <template #end>
            <button
              class="w-full p-link flex align-items-center p-2 pl-4 hover:surface-200 border-noround"
              @click="logout"
            >
              <i class="pi pi-sign-out" />
              <span class="ml-2">Log Out</span>
            </button>
          </template>
        </Menu>
      </template>
    </Menubar>
  </div>
</template>
