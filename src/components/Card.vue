<template>
  <div class="box">
    <article class="columns">
      <div class="column is-one-quarter is-flex">
        <figure class="is-align-self-center">
          <img src="@/assets/animal.png" alt="Image" />
        </figure>
      </div>
      <div class="column content card-content">
        <h1>{{ api.API }}</h1>
        <p><b>Description:</b> {{ api.Description }}</p>
        <p><b>Auth:</b> {{ api.Auth || "none" }}</p>
        <p><b>HTTPS:</b> {{ api.HTTPS }}</p>
        <p><b>Cors:</b> {{ api.Cors }}</p>
        <p>
          <b>Link: </b>
          <a :href="api.Link" class="has-text-success word-wrap">
            {{ api.Link }}
          </a>
        </p>
        <p><b>Category:</b> {{ api.Category }}</p>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Api } from "@/models";

export default {
  name: "Card",
  props: {
    // how to add Vue component props in TypeScript
    // https://stackoverflow.com/a/64832307/1466456
    api: {
      type: Object as PropType<Api>,
      required: true,
    },
  },
  setup(props: { api: Api }) {
    return {
      props,
    };
  },
};
</script>

<style scoped>
.card-content {
  margin-left: 20px;
}
.word-wrap {
  word-wrap: break-word;
}
</style>
