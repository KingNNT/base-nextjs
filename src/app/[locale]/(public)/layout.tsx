"use client";

import { useAppSelector } from "@/libraries/redux/hooks";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface IPublicLayoutProps extends PropsWithChildren {}

const PublicLayout: React.FC<IPublicLayoutProps> = ({ children }) => {
  const router = useRouter();

  const appState = useAppSelector((state) => state.app);
  const authState = useAppSelector((state) => state.auth);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!appState.isBooted) return;
    if (authState.accessToken && authState.refreshToken) {
      router.push("/dashboard");
      return;
    }
    setIsReady(true);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [appState.isBooted]);

  return (
    <>
      {isReady && (
        <Layout className="public-layout">
          <Layout.Content className="public-layout__content">
            {children}
          </Layout.Content>
        </Layout>
      )}
    </>
  );
};

export default PublicLayout;
