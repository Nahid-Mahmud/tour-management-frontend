import { envConfig } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseUrl,
  }),
  endpoints: () => ({}),
  tagTypes: ["Books"],
});
