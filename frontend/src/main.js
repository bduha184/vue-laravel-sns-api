import { createApp } from 'vue'
import {createPinia} from 'pinia'
import router from './js/router.js'
import { createPersistedState } from "pinia-plugin-persistedstate";
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();
pinia.use(createPersistedState())

app.use(router)
app.use(pinia)
app.mount('#app')
