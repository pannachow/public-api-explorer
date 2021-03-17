<template>
  <footer class="footer">
    <div class="container">
      <div class="is-flex is-justify-content-space-around">
        <div>
          <h1 class="has-text-weight-bold">Get around</h1>
          <ul>
            <li v-for="route in routes" :key="route">
              <router-link class="has-text-success" :to="route.path">
                {{ route.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h1 class="has-text-weight-bold">Contact</h1>
          <ul>
            <li>Amsterdam, The Netherlands</li>
            <li>+31 645833745</li>
            <li>
              <a class="has-text-success" href="mailto:chowpanna@gmail.com">
                chowpanna@gmail.com
              </a>
            </li>
            <li>
              <a class="has-text-success" href="https://pannachow.io">
                pannachow.io
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  name: "Footer",
  setup() {
    const router = useRouter();
    // do not include routes with parameters
    const routes = router.options.routes.filter(
      (route) => !route.path.includes(":")
    );

    return {
      routes,
    };
  },
};
</script>
