<template>
  <div>
    <table class="table is-hoverable is-striped is-fullwidth">
      <thead>
        <th v-for="key in Keys" :key="key" @click="sort(key)">
          <a class="has-text-success">
            {{ key }}
            <span class="icon" v-if="sortKey === key && sortDir === +1">
              <i class="fas fa-angle-up"></i>
            </span>
            <span class="icon" v-if="sortKey === key && sortDir === -1">
              <i class="fas fa-angle-down"></i>
            </span>
          </a>
        </th>
      </thead>
      <tbody>
        <tr
          v-for="api in apis"
          :key="api.API"
          @click="goToDetail(api.API)"
          class="is-clickable"
        >
          <td v-for="key in Keys" :key="key">
            {{ api[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Api, ApisResponse } from "@/models";
import { useRouter } from "vue-router";

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
    const router = useRouter();

    async function listApis() {
      // url encoding - coz we have spaces in category (queryParams)
      // https://stackoverflow.com/a/48122942
      const queryParams = new URLSearchParams(
        window.location.search.substring(1)
      );
      const response = await fetch(
        `https://api.publicapis.org/entries?${queryParams}`
      );
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
      },
      goToDetail(title: string) {
        router.push({ name: "Detail", params: { title } });
      }
    };
  }
};
</script>
