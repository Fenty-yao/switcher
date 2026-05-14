import { NavBar } from "antd-mobile";
import React, { ReactNode } from "react";
import { Footer } from ".";

interface ShellProps {
  children: ReactNode;
  title: string;
  backBtn?: string;
  rightBtn?: string;
}

export const Shell = ({ children, backBtn, rightBtn, title }: ShellProps) => {
  return (
    <div className="app">
      <NavBar
        onBack={() => window.history.back()}
        back={backBtn || null}
        right={rightBtn || null}
      >
        {title}
      </NavBar>
      <div className="body">{children}</div>
      <Footer />
    </div>
  );
};
