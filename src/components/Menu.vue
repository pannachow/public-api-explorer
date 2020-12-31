<template>
  <nav
    class="navbar is-fixed-top is-spaced"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': open }"
        @click="toggle()"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu" :class="{ 'is-active': open }">
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
          <div class="navbar-dropdown" :class="{ 'navbar-limited': !open }">
            <router-link
              :to="{ name: 'Home', query: { category: cat } }"
              v-for="cat in cats"
              :key="cat"
              class="navbar-item has-text-success is-size-6"
            >
              {{ cat }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "Menu",
  setup() {
    const cats = ref<string[]>([]);
    const open = ref<boolean>(false);

    async function listCat() {
      const response = await fetch(`https://api.publicapis.org/categories`);
      cats.value = await response.json();
    }

    listCat();

    return {
      cats,
      open,
      toggle() {
        open.value = !open.value;
      }
    };
  }
};
</script>

<style scoped>
.navbar-limited {
  overflow: auto;
  max-height: 500px;
}
.navbar-link:not(.is-arrowless)::after {
  border-color: #48c774;
}
</style>
