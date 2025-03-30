import React from "react";
import { List, Avatar, Button, Space } from "antd-mobile";
import {
  EditSOutline,
  HeartOutline,
  MailOutline,
  LockOutline,
} from "antd-mobile-icons";

const Me: React.FC = () => {
  const user = {
    avatar: "https://via.placeholder.com/80",
    nickname: "Yao",
    bio: "一个喜欢喜欢收集旧手机的人",
    phone: "13023166420",
    email: "fy.fenty@hotmail.com",
  };

  return (
    <div style={{ padding: "16px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <Avatar
            src={user.avatar}
            style={{ "--size": "80px", margin: "0 auto" }}
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
          onClick={() => alert("编辑个人信息")}
        >
          <EditSOutline style={{ marginRight: "8px" }} />
          编辑个人信息
        </Button>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => alert("修改密码")}
        >
          <LockOutline style={{ marginRight: "8px" }} />
          修改密码
        </Button>
      </Space>
    </div>
  );
};

export default Me;
