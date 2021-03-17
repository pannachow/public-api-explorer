<template>
  <Menu />
  <section class="main mb-5">
    <div class="container is-widescreen">
      <!-- reload detail view when title param changes -->
      <!-- https://stackoverflow.com/a/54061913/1466456 -->
      <router-view :key="$route.fullPath" />
    </div>
  </section>
  <Footer class="footer" />
</template>

<script lang="ts">
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Menu,
    Footer,
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}
/* push footer to the bottom of the page */
/* https://stackoverflow.com/a/54502051/1466456 */
.main {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}
</style>
