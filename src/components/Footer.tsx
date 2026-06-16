"use client";

import { TabBar } from "antd-mobile";
import React from "react";
import {
  ShopbagOutline,
  MessageOutline,
  UserOutline,
} from "antd-mobile-icons";
import Link from "next/link";

const tabs = [
  {
    key: "/product-list",
    title: "市场",
    icon: <ShopbagOutline />,
  },
  {
    key: "/messages",
    title: "消息",
    icon: <MessageOutline />,
  },
  {
    key: "/me",
    title: "我的",
    icon: <UserOutline />,
  },
];

export default function Footer() {
  return (
    <TabBar>
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={(active) => (
            <Link href={item.key}>
              {item.icon}
            </Link>
          )}
          title={item.title}
        />
      ))}
    </TabBar>
  );
}
