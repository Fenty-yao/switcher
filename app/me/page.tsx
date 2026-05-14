"use client";

import React from "react";
import { List, Avatar, Button, Space } from "antd-mobile";
import {
  EditSOutline,
  HeartOutline,
  MailOutline,
  LockOutline,
} from "antd-mobile-icons";
import Shell from "@/components/Shell";

export default function MePage() {
  const user = {
    avatar: "https://via.placeholder.com/80",
    nickname: "Yao",
    bio: "一个喜欢收集旧手机的人",
    phone: "13023166420",
    email: "fy.fenty@hotmail.com",
  };

  return (
    <Shell title="Me">
      <div style={{ padding: "16px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <Avatar
              src={user.avatar}
              style={{ "--size": "80px", margin: "0 auto" } as React.CSSProperties}
            />
            <h2>{user.nickname}</h2>
            <p>{user.bio}</p>
          </div>
          <List header="个人信息">
            <List.Item prefix={<MailOutline />} extra={user.email}>
              邮箱
            </List.Item>
            <List.Item prefix={<MailOutline />} extra={user.phone}>
              手机
            </List.Item>
          </List>
          <Button
            block
            color="default"
            size="large"
            onClick={() => alert("编辑个人信息")}
          >
            <HeartOutline style={{ marginRight: "8px" }} />
            我的收藏
          </Button>
          <Button
            block
            color="default"
            size="large"
            onClick={() => alert("安全设置")}
          >
            <LockOutline style={{ marginRight: "8px" }} />
            安全设置
          </Button>
        </Space>
      </div>
    </Shell>
  );
}
