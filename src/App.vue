<script>
  import Homepage from './home/Homepage.vue'
  import RobotBuilder from "@/build/RobotBuilder.vue";

  export default {
    name: 'App',
    components: {
      Homepage,
      RobotBuilder
    }
  }
</script>

<template>
  <main>
      <Homepage msg="Robobuilder"/>
      <HomepageGlobal msg="Global Robobuilder"/>
    <RobotBuilder />
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
