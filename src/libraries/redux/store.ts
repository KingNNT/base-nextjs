import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./features/app/appSlice";
import authReducer from "./features/auth/authSlice";
import { sampleApi } from "./features/sample/sampleApi";
import sampleReducer from "./features/sample/sampleSlice";
import { listenerMiddleware } from "./listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      auth: authReducer,
      sample: sampleReducer,
      [sampleApi.reducerPath]: sampleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(sampleApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export const store = makeStore();
