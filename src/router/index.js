import {createRouter, createWebHistory} from 'vue-router';
import Homepage from "@/home/Homepage.vue";
import RobotBuilder from "@/build/RobotBuilder.vue";
import ProductSearch from "@/search/ProductSearch.vue";
import Partinfo from "@/parts/Partinfo.vue";

export default createRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Homepage,
      props: {msg: "Build a robot yourself"}
    },
    {
      path: '/build',
      name: 'Build',
      component: RobotBuilder,
    },
    {
      path: '/search',
      name: 'Search',
      component: ProductSearch,
    },
    {
      path: '/parts/:partType/:id',
      name: 'Parts',
      component: Partinfo,
      props: true
    }
  ],
  history: createWebHistory()
});
