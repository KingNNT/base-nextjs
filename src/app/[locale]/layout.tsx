"use client";

import { Layout } from "antd";
import React, { PropsWithChildren } from "react";
import { useApp } from "./hooks";

interface ILocaleLayoutProps extends PropsWithChildren {}

const LocaleLayout: React.FC<ILocaleLayoutProps> = ({ children }) => {
  useApp();

  return (
    <>
      <Layout className="locale-layout">{children}</Layout>
    </>
  );
};

export default LocaleLayout;
