import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Homepage from "@/home/Homepage.vue";

const app = createApp(App);

//Registro un componente globale
app.component('HomepageGlobal',Homepage);

app.mount('#app');
