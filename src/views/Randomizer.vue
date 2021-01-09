<template>
  <Card v-if="api" :api="api" />
  <div class="buttons is-centered">
    <button class="button is-success has-text-weight-bold" @click="getRandom()">
      Next random API
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Api } from "@/models";
import Card from "@/components/Card.vue";
import { usePublicApi } from "@/composables";

export default {
  name: "Randomizer",
  components: { Card },
  setup() {
    const api = ref<Api | null>(null);
    const publicApi = usePublicApi();

    async function getRandom(): Promise<void> {
      api.value = await publicApi.getRandomApi();
    }
    getRandom();

    return {
      api,
      getRandom
    };
  }
};
</script>
