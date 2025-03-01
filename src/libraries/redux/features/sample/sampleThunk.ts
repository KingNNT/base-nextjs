import { SampleApis } from "@/request";
import { createAppAsyncThunk } from "../../hooks";
import { Dayjs } from "dayjs";

export const fetchList = createAppAsyncThunk(
  "expenses/fetchList",
  async (
    {
      all,
      page,
      search,
      startDate,
      endDate,
    }: {
      all: boolean;
      page: number;
      search: string;
      startDate: Dayjs;
      endDate: Dayjs;
    },
    { rejectWithValue },
  ) => {
    try {
      const r = await SampleApis.list({
        all,
        page,
        search,
        startDate,
        endDate,
      });
      return r;
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  },
);
