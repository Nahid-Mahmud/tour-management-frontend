import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API = "http://localhost:5000/api/v1";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_API,
  }),
  endpoints: () => ({}),
  tagTypes: ["Books"],
});
