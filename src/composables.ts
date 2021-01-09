import { onMounted, onBeforeUnmount, Ref, ref } from "vue";
import PublicApi from "@/services/PublicApi";

const publicApi = new PublicApi();

export function usePublicApi(): PublicApi {
  return publicApi;
}

function isWindowWidthMobile(): boolean {
  // Bulma mobile view is considered up to 768px
  // https://bulma.io/documentation/overview/responsiveness/#breakpoints
  return window.innerWidth <= 768;
}

export function useIsMobile(): Ref<boolean> {
  const isMobile = ref<boolean>(isWindowWidthMobile());

  function setIsMobile() {
    isMobile.value = isWindowWidthMobile();
  }

  // https://v3.vuejs.org/guide/composition-api-introduction.html#lifecycle-hook-registration-inside-setup
  // https://medium.com/swlh/7-simple-vuejs-tips-you-can-use-to-become-a-better-developer-dd423db07881
  onMounted(() => window.addEventListener("resize", setIsMobile));
  onBeforeUnmount(() => window.removeEventListener("resize", setIsMobile));

  return isMobile;
}
