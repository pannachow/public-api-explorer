export type Api = {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
};

export type ApisResponse = {
  count: number;
  entries: Api[];
};
