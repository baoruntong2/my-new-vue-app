import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import notify from './plugins/notify'
import './assets/styles/index.css'

const app = createApp(App)
const pinia = createPinia()

// 配置全局通知
window.$notify = notify

app.use(pinia)
app.use(router)
app.mount('#app')