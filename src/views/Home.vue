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
            <span
              v-if="key === 'HTTPS' && api[key]"
              class="icon has-text-success"
            >
              <i :title="api[key]" class="fas fa-check"></i>
            </span>
            <span
              v-else-if="key === 'HTTPS' && !api[key]"
              class="icon has-text-danger"
            >
              <i :title="api[key]" class="fas fa-times"></i>
            </span>
            <span
              v-else-if="key === 'Auth' && api[key] === 'apiKey'"
              class="icon has-text-warning"
            >
              <i :title="api[key]" class="fas fa-key"></i>
            </span>
            <span
              v-else-if="key === 'Auth' && api[key] === 'X-Mashape-Key'"
              class="icon has-text-danger"
            >
              <i :title="api[key]" class="fas fa-key"></i>
            </span>
            <span
              v-else-if="key === 'Auth' && api[key] === 'OAuth'"
              class="icon has-text-warning"
            >
              <i :title="api[key]" class="fab fa-openid"></i>
            </span>
            <span
              v-else-if="key === 'Cors' && api[key] === 'yes'"
              class="icon has-text-success"
            >
              <i :title="api[key]" class="fas fa-check"></i>
            </span>
            <span
              v-else-if="key === 'Cors' && api[key] === 'no'"
              class="icon has-text-danger"
            >
              <i :title="api[key]" class="fas fa-times"></i>
            </span>
            <span
              v-else-if="key === 'Cors' && api[key] === 'unknown'"
              class="icon has-text-warning"
            >
              <i :title="api[key]" class="fas fa-question"></i>
            </span>
            <span v-else>{{ api[key] }}</span>
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
