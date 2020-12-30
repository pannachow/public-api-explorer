<template>
  <div class="box">
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
          <a :href="api.Link" class="has-text-success">{{ api.Link }} </a>
        </p>
        <p>Category: {{ api.Category }}</p>
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
    // https://stackoverflow.com/a/64832307/1466456
    api: {
      type: Object as PropType<Api>,
      required: true
    }
  },
  setup(props: { api: Api }) {
    return {
      props
    };
  }
};
</script>

<style scoped>
.card-content {
  margin-left: 20px;
  font-weight: bold;
}
</style>
