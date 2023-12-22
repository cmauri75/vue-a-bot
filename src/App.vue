<script>
import Homepage from './home/Homepage.vue'
import RobotBuilder from "@/build/RobotBuilder.vue";
import ProductSearch from "@/search/ProductSearch.vue";

export default {
  name: 'App',
  components: {
    ProductSearch,
    Homepage,
    RobotBuilder
  },
  data() {
    return {
      user: {username: 'John'},
    }
  },
  provide() {
    return {user: this.user}
  }
}
</script>

<template>
  <main>
    <div>Username: {{user.username}}</div>
    <!-- <HomepageGlobal msg="Global Robobuilder"/> -->
    <RobotBuilder/>
    <!-- <ProductSearch /> -->
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
