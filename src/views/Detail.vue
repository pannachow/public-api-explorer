<template>
  <div class="box" v-if="api">
    <article class="media">
      <div class="media-left">
        <figure>
          <img src="@/assets/animal.png" alt="Image" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <h1>{{ api.API }}</h1>
          <h3>Description: {{ api.Description }}</h3>
          <h3>Auth: {{ api.Auth }}</h3>
          <h3>HTTPS: {{ api.HTTPS }}</h3>
          <h3>Cors: {{ api.Cors }}</h3>
          <h3>Link: {{ api.Link }}</h3>
          <h3>Category: {{ api.Category }}</h3>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item" aria-label="reply">
              <span class="icon is-small">
                <i class="fas fa-reply" aria-hidden="true"></i>
              </span>
            </a>
            <a class="level-item" aria-label="retweet">
              <span class="icon is-small">
                <i class="fas fa-retweet" aria-hidden="true"></i>
              </span>
            </a>
            <a class="level-item" aria-label="like">
              <span class="icon is-small">
                <i class="fas fa-heart" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </nav>
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
.media-left {
  align-self: center;
}
.media-content {
  margin-left: 30px;
  text-align: left;
}
</style>
