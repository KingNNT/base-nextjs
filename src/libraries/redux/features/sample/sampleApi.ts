import { APP_CONFIG } from "@configs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { IPagination, IResponse, ISample } from "@/types";
import {
  setLists,
  pushToLists,
  updateItemInList,
  deleteItemInList,
} from "./sampleSlice";

export const sampleApi = createApi({
  reducerPath: "sampleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_CONFIG.API_ENDPOINT}/v1/sample/`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["sample"],
  endpoints: (builder) => ({
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    fetchListSamples: builder.query<
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      IResponse<ISample[], any> | IResponse<IPagination<ISample>, any>,
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      any
    >({
      query: ({
        all,
        page,
        search,
      }: {
        all: boolean;
        page: number;
        search: string;
      }) => ({
        url: "",
        method: "GET",
        params: {
          all,
          page,
          search,
        },
      }),
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      async onQueryStarted(_: any, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLists((data.data as IPagination<ISample>).results));
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      },
    }),
    createSample: builder.mutation<
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      IResponse<ISample, any>,
      Omit<ISample, "id">
    >({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sample"],
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      async onQueryStarted(_: any, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(pushToLists(data.data));
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      },
    }),
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    updateSample: builder.mutation<IResponse<ISample, any>, ISample>({
      query: ({ id, ...body }) => ({
        url: `${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["sample"],
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      async onQueryStarted(_: any, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateItemInList(data.data));
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      },
    }),
    deleteSample: builder.mutation<IResponse<null, null>, number>({
      query: (id) => ({
        url: `${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["sample"],
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
      async onQueryStarted(id: number, { dispatch, queryFulfilled }) {
        try {
          dispatch(deleteItemInList(id));
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      },
    }),
  }),
});

export const {
  useLazyFetchListSamplesQuery,
  useCreateSampleMutation,
  useUpdateSampleMutation,
  useDeleteSampleMutation,
} = sampleApi;
