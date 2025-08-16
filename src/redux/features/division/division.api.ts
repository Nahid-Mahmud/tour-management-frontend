import { baseApi } from "@/redux/baseApi";
import type { IResponseStructure } from "@/types";

export const division = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDivision: builder.mutation({
      query: (data) => ({
        url: "/division/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Division"],
    }),

    getAllDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["Division"],
    }),

    deleteDivisionById: builder.mutation<IResponseStructure<null>, string>({
      query: (id) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Division"],
    }),

    updateDivisionById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/division/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Division"],
    }),
  }),
});

export const {
  useCreateDivisionMutation,
  useDeleteDivisionByIdMutation,
  useGetAllDivisionQuery,
  useUpdateDivisionByIdMutation,
} = division;
