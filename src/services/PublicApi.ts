import { Api, ApisResponse } from "../models";

const baseUrl = "https://api.publicapis.org";

export default class PublicApi {
  apiCache: Api[] | null;
  categoryCache: string[] | null;

  constructor() {
    this.apiCache = null;
    this.categoryCache = null;
  }

  async getApis(category?: string, limit?: number): Promise<Api[]> {
    if (this.apiCache === null) {
      const response = await fetch(`${baseUrl}/entries`);
      const data: ApisResponse = await response.json();
      this.apiCache = data.entries;
    }

    let result = this.apiCache;
    if (category) {
      result = result.filter(api => api.Category === category);
    }
    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  }

  async getApi(title: string): Promise<Api> {
    const apis = await this.getApis();
    const result = apis.find(api => api.API === title);
    if (!result) {
      throw new Error(`Unable to find API with title "${title}"`);
    }
    return result;
  }

  async getSimilarApis(api: Api, limit?: number): Promise<Api[]> {
    const apis = await this.getApis();
    let result = apis.filter(
      similarApi =>
        similarApi.Category === api.Category && similarApi.API !== api.API
    );
    if (limit) {
      result = result.slice(0, limit);
    }
    return result;
  }

  async getRandomApi(): Promise<Api> {
    const apis = await this.getApis();
    // get random item from array
    // https://stackoverflow.com/a/5915122
    return apis[Math.floor(Math.random() * apis.length)];
  }

  async getCategories(): Promise<string[]> {
    if (this.categoryCache === null) {
      const response = await fetch(`${baseUrl}/categories`);
      const data: string[] = await response.json();
      this.categoryCache = data;
    }

    return this.categoryCache;
  }
}
