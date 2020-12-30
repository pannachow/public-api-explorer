<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="has-text-weight-bold">Get around</h1>
          <ul>
            <li v-for="route in routes" :key="route">
              <a class="has-text-success" :href="route.path">{{
                route.name
              }}</a>
            </li>
          </ul>
        </div>
        <div class="column">
          <h1 class="has-text-weight-bold">Contact</h1>
          <ul>
            <li>Amsterdam, The Netherlands</li>
            <li>+31 645833745</li>
            <li>
              <a class="has-text-success" href="mailto:chowpanna@gmail.com"
                >chowpanna@gmail.com</a
              >
            </li>
            <li>
              <a class="has-text-success" href="https://pannachow.io"
                >pannachow.io</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- <p class="is-size-4 has-text-success">
        This website is created by
        <strong class="has-text-success">Panna</strong>
      </p> -->
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
      route => !route.path.includes(":")
    );

    return {
      routes
    };
  }
};
</script>

<style scoped>
.column {
  text-align: center;
}
</style>
