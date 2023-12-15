<script setup>
import Homepage from './components/Homepage.vue'
</script>

<template>
  <main>
      <Homepage msg="You did it!"/>
  </main>

</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}

main {
  margin: 0 auto;
  padding: 30px;
  background-color: white;
}
</style>
