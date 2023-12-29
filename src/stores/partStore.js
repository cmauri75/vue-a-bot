import {defineStore} from 'pinia';
import {ref} from "vue";

export const usePartStore = defineStore('part', () => {
  const parts = ref(null);

  const getParts = async  () => {
    console.log('fetching parts from server');
    const response = await fetch('/api/parts');
    parts.value = await response.json()
  };

  return {parts, getParts}
})
