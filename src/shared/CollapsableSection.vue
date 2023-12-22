<script setup>
import {ref} from 'vue';

const open = ref(true);
</script>


<template>
  <div class="header">
    <span v-if="open" @click="open=false"><slot name="collapse">&#x25B2; Collapse</slot></span>
    <span v-if="!open" @click="open=true"><slot name="expand">&#x25BC; Expand</slot></span>
  </div>
  <slot v-if="open">
    <div>Default Content</div>
  </slot>
</template>


<style scoped>
.header {
  background-color: #bbb;
  padding: 3px;
  cursor: pointer;
  font-size: 22px;
  font-size: 22px;
}
</style>
