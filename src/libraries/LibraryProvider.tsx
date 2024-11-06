"use client";

import React, { PropsWithChildren } from "react";
import ProviderRegistration from "./ProviderRegistration";
import StoreProvider from "./redux/StoreProvider";

export interface IProviderProps extends PropsWithChildren {}

export const LibraryProvider: React.FC<IProviderProps> = ({ children }) => {
  return (
    <>
      <StoreProvider>
        <ProviderRegistration>{children}</ProviderRegistration>
      </StoreProvider>
    </>
  );
};
