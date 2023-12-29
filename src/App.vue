<script>
/*
import Homepage from './home/Homepage.vue'
import RobotBuilder from "@/build/RobotBuilder.vue";
import ProductSearch from "@/search/ProductSearch.vue";
*/

export default {
  name: 'App',
  /*
  components: {
    ProductSearch,
    Homepage,
    RobotBuilder
  },*/
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
    <div>
      {{ user.username }} you can: [
      <router-link :to="{name:'Home'}" class="nav-link" active-class="home-active">Home</router-link> -
      <router-link :to="{name:'Build'}" class="nav-link">Build robot</router-link> -
      <router-link :to="{name:'Search'}" class="nav-link">Search</router-link> -
      <router-link :to="{name:'Cart'}" class="nav-link cart">Cart</router-link>
      ]
    </div>
    <!-- <HomepageGlobal msg="Global Robobuilder"/> -->
    <!-- <RobotBuilder/> -->
    <!-- <ProductSearch /> -->
    <router-view/>
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
  background-color: gray;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}

.router-link-active {
  color: blue;
}

.home-active {
  color: blue;
  text-shadow: 2px 0px;
}
</style>
