<template>
  <Menu />
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import Menu from "./components/Menu.vue";

export default {
  name: "App",
  components: {
    Menu
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
