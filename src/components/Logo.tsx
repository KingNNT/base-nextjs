import React from "react";
import { ImageComponent } from "./ImageComponent";

export const Logo: React.FC = () => {
  return (
    <>
      <ImageComponent image="LogoPNG" alt="logo" height={48} width={48} />
    </>
  );
};
