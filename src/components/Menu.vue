<template>
  <nav
    class="navbar is-fixed-top is-spaced"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item logo" @click="goTo('/')"></a>
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
        <a
          @click="goTo('/')"
          class="navbar-item has-text-success has-text-weight-bold is-size-5"
        >
          Home
        </a>

        <a
          @click="goTo('/randomizer')"
          class="navbar-item has-text-success has-text-weight-bold is-size-5"
        >
          Random
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a
            class="navbar-link has-text-success has-text-weight-bold is-size-5"
          >
            Categories
          </a>
          <div class="navbar-dropdown" :class="{ 'navbar-limited': !open }">
            <a
              @click="goTo({ name: 'Home', query: { category: cat } })"
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
</template>

<script lang="ts">
import { ref } from "vue";
import { RouteLocationRaw, useRouter } from "vue-router";
import { usePublicApi } from "@/composables";

export default {
  name: "Menu",
  setup() {
    const cats = ref<string[]>([]);
    const open = ref<boolean>(false);
    const router = useRouter();
    const publicApi = usePublicApi();

    async function listCat(): Promise<void> {
      cats.value = await publicApi.getCategories();
    }
    listCat();

    return {
      cats,
      open,
      toggle() {
        open.value = !open.value;
      },
      goTo(location: RouteLocationRaw) {
        // close menu drop down in mobile view
        open.value = false;
        router.push(location);
      },
    };
  },
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
.logo {
  background-image: url(~@/assets/wagtail.svg);
  background-size: cover;
  width: 48px;
  height: 48px;
  margin: 2px;
  /* https://stackoverflow.com/a/53336754/1466456 */
  filter: invert(69%) sepia(8%) saturate(2815%) hue-rotate(88deg)
    brightness(96%) contrast(85%);
}
</style>
