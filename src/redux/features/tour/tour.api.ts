import { baseApi } from "@/redux/baseApi";
import type { IResponseStructure, ITourTypeCreate, ITourTypeResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTourType: builder.mutation<IResponseStructure<ITourTypeResponse>, ITourTypeCreate>({
      query: (data) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: data,
      }),
    }),

    getAllTourType: builder.query<IResponseStructure<ITourTypeResponse[]>, void>({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
    }),

    deleteTourTypeById: builder.mutation<IResponseStructure<null>, string>({
      query: (id) => ({
        url: `/tour/tour-types/${id}`,
        method: "DELETE",
      }),
    }),

    updateTourTypeById: builder.mutation<
      IResponseStructure<ITourTypeResponse>,
      { id: string; data: Partial<ITourTypeCreate> }
    >({
      query: ({ id, data }) => ({
        url: `/tour/tour-types/${id}`,
        method: "PATCH",
        data: data,
      }),
    }),
  }),
});

export const {
  useCreateTourTypeMutation,
  useGetAllTourTypeQuery,
  useDeleteTourTypeByIdMutation,
  useUpdateTourTypeByIdMutation,
} = tourApi;
