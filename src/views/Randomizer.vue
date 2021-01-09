<template>
  <Card v-if="api" :api="api" />
  <div class="buttons is-centered">
    <button
      class="button is-success has-text-weight-bold mb-5"
      @click="getRandom()"
    >
      Next random API
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Api, ApisResponse } from "@/models";
import Card from "@/components/Card.vue";

export default {
  name: "Randomizer",
  components: { Card },
  setup() {
    const api = ref<Api | null>(null);

    async function getRandom() {
      const response = await fetch(`https://api.publicapis.org/random`);
      const data: ApisResponse = await response.json();
      api.value = data.entries[0];
    }

    getRandom();

    return {
      api,
      getRandom
    };
  }
};
</script>
