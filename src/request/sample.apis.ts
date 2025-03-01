import { IResponse, ISample } from "@/types";
import { APP_CONFIG } from "@configs";
import { Dayjs } from "dayjs";
import { BaseApis } from "./apis";
import { fetchAPI } from "./instance";

export class SampleApis extends BaseApis {
  constructor() {
    super(`${APP_CONFIG.API_ENDPOINT}/v1/sample`);
  }

  public async list({
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
  }) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const r = await fetchAPI<IResponse<ISample, any>>(
      `${this.endpoint}/` +
        new URLSearchParams({
          all: `${all}`,
          page: page.toString(),
          search: search,
          start_date: startDate.format("YYYY-MM-DD"),
          end_date: endDate.format("YYYY-MM-DD"),
        }).toString(),
      {
        method: "GET",
        credentials: "include",
      },
    );
    return r;
  }

  public async create({ name }: { name: string }) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const r = await fetchAPI<IResponse<ISample, any>>(`${this.endpoint}/`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name,
      }),
    });
    return r;
  }

  public async update({ id, name }: { id: number; name: string }) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const r = await fetchAPI<IResponse<ISample, any>>(
      `${this.endpoint}/` +
        new URLSearchParams({ id: id.toString() }).toString(),
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          name,
        }),
      },
    );
    return r;
  }

  public async partialUpdate({ id, name }: { id: number; name: string }) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const r = await fetchAPI<IResponse<ISample, any>>(
      `${this.endpoint}/` +
        new URLSearchParams({ id: id.toString() }).toString(),
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          name,
        }),
      },
    );
    return r;
  }

  public async delete({ id }: { id: number }) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const r = await fetchAPI<IResponse<ISample, any>>(
      `${this.endpoint}/` +
        new URLSearchParams({ id: id.toString() }).toString(),
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    return r;
  }
}
const apis = new SampleApis();
export default apis;
