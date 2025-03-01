import { CACHE_KEYS } from "@/constants";
import { IResponse } from "@/types";
import { StorageUtil } from "@/utils";

const DEFAULT_REQUEST: RequestInit = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const fetchAPI = async <R>(url: URL | string, reqInit?: RequestInit) => {
  const requestApi: RequestInit = {
    ...reqInit,
  };

  if (reqInit?.headers) {
    requestApi.headers = {
      ...DEFAULT_REQUEST.headers,
      ...reqInit.headers,
    };
  } else {
    requestApi.headers = {
      ...DEFAULT_REQUEST.headers,
    };
  }

  const accessToken = StorageUtil.get(CACHE_KEYS.ACCESS_TOKEN);

  if (accessToken) {
    requestApi.headers = {
      ...requestApi.headers,
      ...{ Authorization: `Bearer ${accessToken}` },
    };
  }

  const res = await fetch(url, requestApi);
  if (!res.ok) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const msg: IResponse<null, any> = await res.json();
    throw new Error(JSON.stringify(msg.errors));
  }

  try {
    const json: R = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
};
