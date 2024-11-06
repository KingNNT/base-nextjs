"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import React, { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { useAppSelector } from "./redux/hooks";
import { createIntlInstance } from "./intl";
import { getAntdTheme } from "@/utils/theme";

export interface IProviderProps extends PropsWithChildren {}

const ProviderRegistration: React.FC<IProviderProps> = ({ children }) => {
  const appState = useAppSelector((state) => state.app);

  const intlIns = createIntlInstance(appState.locale);

  return (
    <AntdRegistry>
      <ConfigProvider theme={getAntdTheme()}>
        <IntlProvider
          defaultLocale="en"
          locale={intlIns.locale}
          messages={intlIns.messages}
        >
          {children}
        </IntlProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default ProviderRegistration;
