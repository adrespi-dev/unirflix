import { FC, ReactNode } from "react";
import { ApiKeySetup } from "./ApiKeySetup";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-header">
        <div className="logo">UNIRFLIX</div>
        <ApiKeySetup />
      </div>
      <div className="layout-body">{children}</div>
    </div>
  );
};
