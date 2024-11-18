import React, { PropsWithChildren } from "react";

interface IPrivateLayoutProps extends PropsWithChildren {}

const PrivateLayout: React.FC<IPrivateLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default PrivateLayout;
