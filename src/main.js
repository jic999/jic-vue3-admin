import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'

import './styles/index.scss'
import 'uno.css'

const app = createApp(App)

app.use(pinia).use(router)

app.mount('#app')
