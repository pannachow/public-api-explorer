<template>
  <Card v-if="api" :api="api" />
  <div class="content">
    <h4 class="ml-2">Other APIs from the same category:</h4>
  </div>
  <div class="columns">
    <div v-for="api in otherApis" :key="api.API" class="column">
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
import { Api, ApisResponse } from "@/models";
import Card from "@/components/Card.vue";

export default {
  name: "Detail",
  components: { Card },
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
