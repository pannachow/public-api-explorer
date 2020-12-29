<template>
  <div>
    <table class="table is-hoverable is-striped is-fullwidth">
      <thead>
        <th v-for="key in Keys" :key="key" @click="sort(key)">
          {{ key }}
          <span class="icon" v-if="sortKey === key && sortDir === +1">
            <i class="fas fa-angle-up"></i>
          </span>
          <span class="icon" v-if="sortKey === key && sortDir === -1">
            <i class="fas fa-angle-down"></i>
          </span>
        </th>
      </thead>
      <tbody>
        <tr v-for="api in apis" :key="api.API">
          <td v-for="key in Keys" :key="key">
            <router-link :to="{ name: 'Detail', params: { name: api.API } }">{{
              api[key]
            }}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Api, ApisResponse } from "@/models";

const Keys: (keyof Api)[] = [
  "API",
  "Description",
  "Auth",
  "HTTPS",
  "Cors",
  "Link",
  "Category"
];

export default {
  name: "Home",
  setup() {
    const apis = ref<Api[]>([]);
    const sortKey = ref<string | null>(null);
    const sortDir = ref<number>(+1);

    async function listApis() {
      const response = await fetch("https://api.publicapis.org/entries");
      const data: ApisResponse = await response.json();

      apis.value = data.entries.slice(0, 10);
    }

    listApis();

    return {
      apis,
      Keys,
      sortKey,
      sortDir,
      sort(key: keyof Api) {
        const dir = key === sortKey.value ? -sortDir.value : +1;
        apis.value = apis.value.sort((a, b) => (a[key] > b[key] ? dir : -dir));
        sortKey.value = key;
        sortDir.value = dir;
      }
    };
  }
};
</script>
