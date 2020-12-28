<template>
  <div>
    <table class="table is-hoverable is-striped is-fullwidth">
      <thead>
        <th>NAME</th>
        <th>CATEGORY</th>
        <th>AUTH</th>
        <th>HTTPS</th>
        <th>CORS</th>
      </thead>
      <tbody>
        <tr v-for="api in apis" :key="api.API">
          <td>
            <router-link :to="{ name: 'Detail', params: { name: api.API } }">{{
              api.API
            }}</router-link>
          </td>
          <td>{{ api.Category }}</td>
          <td>{{ api.Auth }}</td>
          <td>{{ api.HTTPS }}</td>
          <td>{{ api.Cors }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "Home",
  setup() {
    const apis = ref([]);

    async function listApis() {
      const response = await fetch("https://api.publicapis.org/entries");
      const data = await response.json();

      apis.value = data.entries.slice(0, 10);
    }

    listApis();

    return {
      apis
    };
  }
};
</script>
