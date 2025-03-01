"use client";

import { Layout } from "antd";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Header, Footer, BreadcrumbComponent, Sidebar } from "./_components";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/libraries/redux/hooks";
import { useResponsive } from "@/app/hooks";

interface IPrivateLayoutProps extends PropsWithChildren {}

const PrivateLayout: React.FC<IPrivateLayoutProps> = ({ children }) => {
  const router = useRouter();

  const appState = useAppSelector((state) => state.app);
  const authState = useAppSelector((state) => state.auth);

  const [isReady, setIsReady] = useState(false);

  const { isMobile } = useResponsive();

  useEffect(() => {
    if (!appState.isBooted) return;

    if (!authState.accessToken || !authState.refreshToken) {
      router.push("/sign-in");
      return;
    }
    setIsReady(true);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [appState.isBooted]);

  return (
    <>
      {isReady && (
        <Layout className="private-layout">
          <Layout.Header className="private-layout__header">
            <Header />
          </Layout.Header>
          <Layout.Content className="private-layout__content">
            {!isMobile && <BreadcrumbComponent />}
            <Layout className="private-layout__content__layout">
              <Sidebar />
              <Layout.Content className="private-layout__content__layout__content">
                {children}
              </Layout.Content>
            </Layout>
          </Layout.Content>
          <Layout.Footer className="private-layout__footer">
            <Footer />
          </Layout.Footer>
        </Layout>
      )}
    </>
  );
};

export default PrivateLayout;
