"use client";

import { Layout } from "antd";
import React, { PropsWithChildren } from "react";
import useApp from "@/hooks/useApp";

interface ILocaleLayoutProps extends PropsWithChildren {}

const LocaleLayout: React.FC<ILocaleLayoutProps> = ({ children }) => {
  useApp();

  return (
    <Layout>
      <>{children}</>
    </Layout>
  );
};

export default LocaleLayout;
