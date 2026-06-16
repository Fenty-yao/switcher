"use client";

import { NavBar } from "antd-mobile";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

interface ShellProps {
  children: ReactNode;
  title: string;
  backBtn?: string;
  rightBtn?: string;
}

export default function Shell({ children, backBtn, rightBtn, title }: ShellProps) {
  const router = useRouter();

  return (
    <div className="app">
      <NavBar
        onBack={() => router.back()}
        back={backBtn || undefined}
        right={rightBtn || undefined}
      >
        {title}
      </NavBar>
      <div className="body">{children}</div>
      <Footer />
    </div>
  );
}
