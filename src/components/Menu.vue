<template>
  <div class="Menu">
    <nav
      class="navbar is-fixed-top is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            Home
          </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Categories
            </a>
            <div class="navbar-dropdown">
              <a v-for="cat in cats" :key="cat" class="navbar-item">
                {{ cat }}
              </a>
            </div>

            <a class="navbar-item">
              Random
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "Menu",
  setup() {
    const cats = ref<string[]>([]);

    async function listCat() {
      const response = await fetch(`https://api.publicapis.org/categories`);
      cats.value = await response.json();
    }

    listCat();

    return {
      cats
    };
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  font-size: 22px;
  font-weight: bold;
}
.navbar-dropdown {
  overflow: auto;
  max-height: 500px;
}
</style>
