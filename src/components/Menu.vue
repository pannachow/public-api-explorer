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
          <router-link
            to="/"
            class="navbar-item has-text-success has-text-weight-bold is-size-5"
          >
            Home
          </router-link>

          <router-link
            to="/randomizer"
            class="navbar-item has-text-success has-text-weight-bold is-size-5"
          >
            Random
          </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a
              class="navbar-link has-text-success has-text-weight-bold is-size-5"
            >
              Categories
            </a>
            <div class="navbar-dropdown">
              <a
                v-for="cat in cats"
                :key="cat"
                class="navbar-item has-text-success is-size-6"
              >
                {{ cat }}
              </a>
            </div>
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
  margin: 0 20px;
}
.navbar-dropdown {
  overflow: auto;
  max-height: 500px;
}
.navbar-link:not(.is-arrowless)::after {
  border-color: #48c774;
}
</style>
