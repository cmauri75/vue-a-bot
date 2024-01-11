import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'

import Homepage from "@/home/Homepage.vue";
import router from "@/router/index.js";
import {createPinia} from "pinia";
import {usePartStore} from "@/stores/partStore.js";
import localStoragePlugin from "@/stores/local-storage-plugin.js"

const app = createApp(App);
const pinia = createPinia();
pinia.use(localStoragePlugin);

//Registro un componente globale
app.component('HomepageGlobal', Homepage)
  .use(router)
  .use(pinia);

const partStore = usePartStore();

partStore.$onAction(({name, store, args, after, onError}) => {
  if (name === 'getParts') {
    store.productLoading = true;
  }
  after((results) => {
    store.productLoading = false;
  });
  onError(() => {
    store.productLoading = false;
  })
});


app.mount('#app');
