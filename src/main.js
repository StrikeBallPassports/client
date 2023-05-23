import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios"
import VueAxios from "vue-axios"

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

createApp(App).use(router).use(VueAxios, axios).mount('#app')
