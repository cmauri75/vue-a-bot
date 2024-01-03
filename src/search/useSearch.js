import {computed, onMounted} from 'vue';
import {usePartStore} from "@/stores/partStore.js";

export default function useSearch(searchTerm, parts) {
  const partStore = usePartStore();
  partStore.getParts();

  //NB: getParts is async, so you should wait for data ready and so allParts should be a computed
  const allParts = computed(() =>
    partStore.parts ?
      [...partStore.parts.heads, ...partStore.parts.arms, ...partStore.parts.torsos, ...partStore.parts.bases] :
      []);

  const results = computed(() => {
    let searchResults;
    if (!searchTerm.value) searchResults = allParts.value;
    else {
      const lowerTerm = searchTerm.value.toLowerCase();
      searchResults = allParts.value.filter(
        (part) => part.title.toLowerCase().includes(lowerTerm),
      );
    }
    return [...searchResults];
  });

  onMounted(() => console.log('Mounted: useSearch'));

  return {searchResults: results};
}
