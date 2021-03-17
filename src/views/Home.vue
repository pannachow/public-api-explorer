<template>
  <section class="hero is-success">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Welcome to the public API explorer</h1>
        <h2 class="subtitle">
          An explorer for
          <a href="https://api.publicapis.org">api.publicapis.org</a>
        </h2>
      </div>
    </div>
  </section>

  <div class="table-container">
    <table
      class="table is-hoverable is-striped is-fullwidth"
      :class="{ 'is-narrow': isMobile }"
    >
      <thead>
        <th v-for="key in keys" :key="key" @click="sort(key)">
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
          <td v-for="key in keys" :key="key">
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

  <div class="container" v-if="pages !== null">
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a
        v-if="!isMobile"
        class="pagination-previous"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1 || null"
        >Previous</a
      >
      <a
        v-if="!isMobile"
        class="pagination-next"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage == pages || null"
        >Next page</a
      >
      <ul class="pagination-list" v-if="pages > 5">
        <li v-if="pages > 5 && currentPage > 2">
          <a
            class="pagination-link"
            aria-label="Goto page 1"
            @click="goToPage(1)"
            >1</a
          >
        </li>
        <li v-if="pages > 5 && currentPage > 3">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="currentPage > 1">
          <a
            class="pagination-link"
            :aria-label="`Goto page ${currentPage - 1}`"
            @click="goToPage(currentPage - 1)"
          >
            {{ currentPage - 1 }}
          </a>
        </li>
        <li>
          <a
            class="pagination-link is-current"
            :aria-label="`Page ${currentPage}`"
            aria-current="page"
            >{{ currentPage }}</a
          >
        </li>
        <li v-if="currentPage < pages">
          <a
            class="pagination-link"
            :aria-label="`Goto page ${currentPage + 1}`"
            @click="goToPage(currentPage + 1)"
          >
            {{ currentPage + 1 }}
          </a>
        </li>
        <li v-if="pages > 5 && currentPage < pages - 2">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="pages > 5 && currentPage < pages - 1">
          <a
            class="pagination-link"
            :aria-label="`Goto page ${pages}`"
            @click="goToPage(pages)"
          >
            {{ pages }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePublicApi, useIsMobile } from "@/composables";
import { Api } from "@/models";

// table columns shown on large screens
const DesktopKeys: (keyof Api)[] = [
  "API",
  "Description",
  "Auth",
  "HTTPS",
  "Cors",
  "Category",
];
// table columns shown on small screens
const MobileKeys: (keyof Api)[] = ["API", "Auth", "HTTPS", "Cors", "Category"];

export default {
  name: "Home",
  setup() {
    const apis = ref<Api[]>([]);
    // which table column to sort by
    const sortKey = ref<string | null>(null);
    // +1 for sorting ascending order (A-Z), -1 for descending order (Z-A)
    const sortDir = ref<number>(+1);
    const pages = ref<number | null>(null);
    const currentPage = ref<number>(1);
    const router = useRouter();
    const route = useRoute();
    const publicApi = usePublicApi();
    const isMobile = useIsMobile();
    const keys = computed(() => (isMobile.value ? MobileKeys : DesktopKeys));

    async function listApis(): Promise<void> {
      // route.query has a complicated type - we only expect it to be of type string
      const category =
        typeof route.query["category"] === "string"
          ? route.query["category"]
          : undefined;
      const pageSize = 10;

      if (pages.value === null) {
        const apiCount = await publicApi.getApiCount(category);
        pages.value = Math.max(Math.ceil(apiCount / pageSize), 1);
      }

      apis.value = await publicApi.getApis(
        category,
        (currentPage.value - 1) * pageSize,
        pageSize
      );
    }
    listApis();

    return {
      apis,
      keys,
      sortKey,
      sortDir,
      sort(key: keyof Api) {
        const dir = key === sortKey.value ? -sortDir.value : +1;
        apis.value = apis.value.sort((a, b) => (a[key] > b[key] ? dir : -dir));
        sortKey.value = key;
        sortDir.value = dir;
      },
      pages,
      currentPage,
      goToPage(page: number) {
        if (pages.value === null) {
          return;
        }
        currentPage.value = Math.min(Math.max(page, 1), pages.value);
        listApis();
      },
      goToDetail(title: string) {
        router.push({ name: "Detail", params: { title } });
      },
      isMobile,
    };
  },
};
</script>

<style scoped>
.pagination-link.is-current {
  background-color: #48c774;
  border-color: #dbdbdb;
}
</style>
