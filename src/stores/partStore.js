import {defineStore} from 'pinia';
import {ref} from "vue";

export const usePartStore = defineStore('part', () => {

    const productLoading = ref(false);
    const parts = ref(null);

    const getParts = async () => {
      if (parts.value) return;
      console.log('fetching parts from server');
      const response = await fetch('/api/parts');
      parts.value = await response.json()
    };

    return {parts, getParts, productLoading}
  },
  {cache: {getParts: {stateKey: 'parts', loadingStateKey: 'productLoading'}}})
