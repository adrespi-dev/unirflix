import { FC, ReactNode } from "react";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-header">UNIRFLIX</div>
      <div className="layout-body">{children}</div>
    </div>
  );
};
