import { setToken } from "@/libraries/redux/features/auth/authSlice";
import { useAppDispatch } from "@/libraries/redux/hooks";
import { AuthApis } from "@/request";
import { IAuthToken, IResponse } from "@/types";
import { useState } from "react";
import { useIntl } from "react-intl";

export const useLogin = () => {
  const intl = useIntl();
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const [response, setResponse] = useState<IResponse<IAuthToken, any>>();
  const [error, setError] = useState<string>();

  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    try {
      const r = await AuthApis.login(email, password);
      setResponse(r);
      dispatch(
        setToken({
          accessToken: r.data.access_token,
          refreshToken: r.data.refresh_token,
        }),
      );
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      if (e instanceof Error) {
        if (e.message.includes("Invalid email or password.")) {
          setError(intl.formatMessage({ id: "invalid_email_or_password" }));
        }
        return;
      }
      throw e;
    }
  };
  return { response, error, login };
};
