<template>
  <Menu />
  <div class="container">
    <router-view />
  </div>
  <Footer class="footer" />
</template>

<script lang="ts">
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Menu,
    Footer
  }
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
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
.container {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}
</style>
