import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/randomizer",
    name: "Randomizer",
    component: () =>
      import(/* webpackChunkName: "randomizer" */ "../views/Randomizer.vue")
  },
  {
    path: "/detail/:title",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;
