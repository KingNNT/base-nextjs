import React, { PropsWithChildren } from "react";

interface IPublicLayoutProps extends PropsWithChildren {}

const PublicLayout: React.FC<IPublicLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default PublicLayout;
