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
        url: "/tour/get-all-tour-types",
        method: "GET",
      }),
    }),

    getTourTypeById: builder.query<IResponseStructure<ITourTypeResponse>, string>({
      query: (id) => ({
        url: `/tour/get-tour-type/${id}`,
        method: "GET",
      }),
    }),

    deleteTourTypeById: builder.mutation<IResponseStructure<null>, string>({
      query: (id) => ({
        url: `/tour/delete-tour-type/${id}`,
        method: "DELETE",
      }),
    }),

    updateTourTypeById: builder.mutation<IResponseStructure<ITourTypeResponse>, { id: string; data: Partial<ITourTypeCreate> }>({
      query: ({ id, data }) => ({
        url: `/tour/update-tour-type/${id}`,
        method: "PUT",
        data: data,
      }),
    }),
  }),
});

export const {
  useCreateTourTypeMutation,
  useGetAllTourTypeQuery,
  useGetTourTypeByIdQuery,
  useDeleteTourTypeByIdMutation,
  useUpdateTourTypeByIdMutation,
} = tourApi;
