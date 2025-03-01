import { IAuthToken, IResponse } from "@/types";
import { fetchAPI } from "./instance";
import { BaseApis } from "./apis";
import { APP_CONFIG } from "@configs";

export class AuthApis extends BaseApis {
  constructor() {
    super(`${APP_CONFIG.API_ENDPOINT}/v1/auth`);
  }

  public async login(email: string, password: string) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const r = await fetchAPI<IResponse<IAuthToken, any>>(
      `${this.endpoint}/login/`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    return r;
  }
}
const apis = new AuthApis();
export default apis;
