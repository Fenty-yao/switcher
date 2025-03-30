import React, { useState } from "react";
import { Button, Input } from "antd-mobile";
import { Form } from "react-router";
import "./login.css";

const Login: React.FC = ({ actionData }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <h2 className="login-title">登录</h2>
      <Form className="login-form" method="post">
        <div className="input-group">
          <Input
            placeholder="用户名"
            value={username}
            type="text"
            name="username"
            onChange={(value) => setUsername(value)}
          />
        </div>
        <div className="input-group">
          <Input
            placeholder="密码"
            type="password"
            name="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <Button type="submit" block color="primary" size="large">
          登录
        </Button>
        <br />
        <Button block color="default" size="large">
          注册
        </Button>
        <div className="reset-password-link">
          <a href="/reset-password">忘记密码?</a>
          {actionData?.failed}
        </div>
      </Form>
    </div>
  );
};

export default Login;
