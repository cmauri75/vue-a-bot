<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const envMsg = import.meta.env.VITE_APP_TEST;
console.log('VITE_APP_TEST: '+envMsg);
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
  <div class="green">
    <router-link to="/build">Get started on {{envMsg}}</router-link>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
