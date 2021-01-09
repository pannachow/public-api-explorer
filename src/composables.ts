import PublicApi from "@/services/PublicApi";

const publicApi = new PublicApi();

export function usePublicApi(): PublicApi {
  return publicApi;
}
