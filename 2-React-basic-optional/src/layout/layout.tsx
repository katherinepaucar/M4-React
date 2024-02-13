import React, { PropsWithChildren } from "react";
import ResponsiveAppBar from "./navBar";
export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  );
};
