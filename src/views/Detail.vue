<template>
  <div class="box" v-if="api">
    <article class="columns">
      <div class="column is-one-quarter is-flex">
        <figure class="is-align-self-center">
          <img src="@/assets/animal.png" alt="Image" />
        </figure>
      </div>
      <div class="column content card-content">
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
  <div class="content">
    <h4 class="ml-2">Other APIs from the same category:</h4>
  </div>
  <div class="columns">
    <div v-for="api in otherApis" :key="api.API" class="column">
      <div class="box">
        <router-link
          :to="{ name: 'Detail', params: { title: api.API } }"
          class="has-text-weight-bold is-size-5"
        >
          {{ api.API }}
        </router-link>
        <p class="is-size-6">{{ api.Description }}</p>
      </div>
    </div>
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
    const otherApis = ref<Api[]>([]);

    async function listApi() {
      const response = await fetch(
        `https://api.publicapis.org/entries?title=${route.params.title}`
      );
      const data: ApisResponse = await response.json();
      api.value = data.entries[0];

      const otherResponse = await fetch(
        `https://api.publicapis.org/entries?category=${api.value.Category}`
      );
      const otherData: ApisResponse = await otherResponse.json();
      otherApis.value = otherData.entries
        .filter(otherApi => data.entries[0].API !== otherApi.API)
        .slice(0, 3);
    }

    listApi();

    return {
      api,
      otherApis
    };
  }
};
</script>

<style scoped>
.card-content {
  margin-left: 20px;
  font-weight: bold;
}
a {
  color: #42b983;
}
</style>
