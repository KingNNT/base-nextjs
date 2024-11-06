export const fetchAPI = async <R>(url: URL | string, reqInit?: RequestInit) => {
  const defaultRequestInit: RequestInit = {
    headers: {
      "cache-control": "no-cache",
    },
  };
  const res = await fetch(url, { ...defaultRequestInit, ...reqInit });
  if (!res.ok) {
    throw new Error("HTTP status failed");
  }

  try {
    const json: R = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
};
