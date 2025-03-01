import { CACHE_KEYS } from "@/constants";
import { StorageUtil } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  accessToken: string | null;
  refreshToken: string | null;
  payloadAccessToken: unknown | null;
}

const initialState: IState = {
  accessToken: null,
  refreshToken: null,
  payloadAccessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      StorageUtil.set(CACHE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
      StorageUtil.set(CACHE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
    },
    loadToken: (state) => {
      const cachedAccessToken = StorageUtil.get<string>(
        CACHE_KEYS.ACCESS_TOKEN,
      );
      const cachedRefreshToken = StorageUtil.get<string>(
        CACHE_KEYS.REFRESH_TOKEN,
      );
      if (cachedAccessToken) {
        state.accessToken = cachedAccessToken;
      }
      if (cachedRefreshToken) {
        state.refreshToken = cachedRefreshToken;
      }
    },
    clearToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      StorageUtil.removeKeys([
        CACHE_KEYS.ACCESS_TOKEN,
        CACHE_KEYS.REFRESH_TOKEN,
      ]);
    },
  },
});

export const { setToken, loadToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
