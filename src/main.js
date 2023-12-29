import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'

import Homepage from "@/home/Homepage.vue";
import router from "@/router/index.js";
import {createPinia} from "pinia";

const app = createApp(App);

//Registro un componente globale
app.component('HomepageGlobal', Homepage)
  .use(router)
  .use(createPinia())
  .mount('#app');
