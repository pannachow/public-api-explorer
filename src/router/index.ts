import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
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
  // we use hash mode because history mode doesn't work on Github Pages
  // https://next.router.vuejs.org/guide/essentials/history-mode.html#hash-mode
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});
export default router;
