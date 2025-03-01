"use client";

import { PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <>
      <Provider store={storeRef.current}>{children}</Provider>
    </>
  );
};

export default StoreProvider;
