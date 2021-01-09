<template>
  <Card v-if="api" :api="api" />
  <div class="content">
    <h4 class="ml-2">Other APIs from the same category:</h4>
  </div>
  <div class="columns">
    <div v-for="api in otherApis" :key="api" class="column">
      <div class="box">
        <router-link
          :to="{ name: 'Detail', params: { title: api.API } }"
          class="has-text-weight-bold has-text-success is-size-5"
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
import { Api } from "@/models";
import Card from "@/components/Card.vue";
import { usePublicApi } from "@/composables";

export default {
  name: "Detail",
  components: { Card },
  setup() {
    const api = ref<Api | null>(null);
    const otherApis = ref<Api[]>([]);
    const route = useRoute();
    const publicApi = usePublicApi();

    async function listApi(): Promise<void> {
      if (Array.isArray(route.params.title)) {
        throw new Error(
          `Parameter "title" must be a string but was "${route.params.title}"`
        );
      }
      api.value = await publicApi.getApi(route.params.title);
      otherApis.value = await publicApi.getSimilarApis(api.value, 3);
    }
    listApi();

    return {
      api,
      otherApis
    };
  }
};
</script>
