import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Icons, Popup} from 'lanli-ui'

createApp(App).use(store).use(router).use(Icons).use(Popup).mount('#app')
