import { IResponse } from "@/types";
import { fetchAPI } from "./instance";

export class Apis {
  constructor() {
    //
  }

  public async get() {
    const r = await fetchAPI<IResponse>(`xxx/assistant`, {
      method: "GET",
    });
    return r;
  }
}
const apis = new Apis();
export default apis;
