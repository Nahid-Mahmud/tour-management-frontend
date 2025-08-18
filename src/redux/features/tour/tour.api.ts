import { baseApi } from "@/redux/baseApi";
import type { IResponseStructure, ITour, ITourTypeCreate, ITourTypeResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTourType: builder.mutation<IResponseStructure<ITourTypeResponse>, ITourTypeCreate>({
      query: (data) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["TourType"],
    }),

    getAllTourType: builder.query<IResponseStructure<ITourTypeResponse[]>, void>({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TourType"],
    }),

    deleteTourTypeById: builder.mutation<IResponseStructure<null>, string>({
      query: (id) => ({
        url: `/tour/tour-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TourType"],
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
      invalidatesTags: ["TourType"],
    }),

    createTour: builder.mutation<IResponseStructure<ITour>, FormData>({
      query: (data) => ({
        url: "/tour/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Tour"],
    }),

    getAllTour: builder.query<IResponseStructure<ITour[]>, void>({
      query: () => ({
        url: "/tour",
        method: "GET",
      }),
      providesTags: ["Tour"],
    }),
  }),
});

export const {
  useCreateTourTypeMutation,
  useGetAllTourTypeQuery,
  useDeleteTourTypeByIdMutation,
  useUpdateTourTypeByIdMutation,
  useCreateTourMutation,
  useGetAllTourQuery,
} = tourApi;
