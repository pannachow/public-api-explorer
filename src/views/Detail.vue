<template>
  <div class="box" v-if="api">
    <article class="columns">
      <div class="column is-one-quarter is-flex">
        <figure class="is-align-self-center">
          <img src="@/assets/animal.png" alt="Image" />
        </figure>
      </div>
      <div class="column content">
        <p>{{ api.API }}</p>
        <p>Description: {{ api.Description }}</p>
        <p>Auth: {{ api.Auth }}</p>
        <p>HTTPS: {{ api.HTTPS }}</p>
        <p>Cors: {{ api.Cors }}</p>
        <p>
          Link:
          <a :href="api.Link">{{ api.Link }} </a>
        </p>
        <p>Category: {{ api.Category }}</p>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Api, ApisResponse } from "@/models";

export default {
  name: "Detail",
  setup() {
    const route = useRoute();
    const api = ref<Api | null>(null);

    async function listApi() {
      const response = await fetch(
        `https://api.publicapis.org/entries?title=${route.params.name}`
      );
      const data: ApisResponse = await response.json();

      api.value = data.entries[0];
    }

    listApi();

    return {
      api
    };
  }
};
</script>

<style scoped>
.content {
  margin-left: 30px;
  text-align: left;
  font-weight: bold;
}
a {
  color: #42b983;
}
</style>
