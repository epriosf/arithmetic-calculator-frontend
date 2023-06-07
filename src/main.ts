import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import { authentication } from '@/plugins/authentication'
//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css'
//core
import 'primevue/resources/primevue.min.css'
//icons
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue)
app.use(createPinia())

authentication.install().then(() => {
  app.use(router)
  app.mount('#app')
})
