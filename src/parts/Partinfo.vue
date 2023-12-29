<script setup>
import {computed} from "vue";
import parts from "@/data/parts.js";
import {useRoute} from "vue-router";

const props = defineProps(['partType','id'])
const part = computed(() => {
/*
  const route = useRoute();
  const partType = route.params.partType;
  const id = route.params.id;
  const part = parts[partType].find(part => part.id === +id);
  return part;
*/

  return parts[props.partType].find(part => part.id === +props.id);
})
</script>

<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div>
      {{ part.description }}
    </div>
  </div>
</template>

<style scoped>

</style>
