import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => {
        console.log("userInfo in auth.api.ts:", userInfo);
        return {
          url: "/user/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});

export const { useRegisterMutation } = authApi;
