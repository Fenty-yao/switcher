"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, NavBar, Toast } from "antd-mobile";
import { register } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      Toast.show({ icon: "fail", content: "请填写所有字段" });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ icon: "fail", content: "两次密码不一致" });
      return;
    }
    try {
      await register(username, password);
      router.push("/community-search");
    } catch (err: any) {
      Toast.show({ icon: "fail", content: err.message || "注册失败" });
    }
  };

  return (
    <div>
      <NavBar className="register-bar" onBack={() => router.push("/login")}>
        登录
      </NavBar>
      <div className="login-container">
        <h2 className="login-title">注册</h2>
        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <Input
              placeholder="邮箱/电话号码"
              value={username}
              type="text"
              onChange={(value) => setUsername(value)}
            />
          </div>
          <div className="input-group">
            <Input
              placeholder="密码"
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </div>
          <div className="input-group">
            <Input
              placeholder="确认密码"
              type="password"
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
            />
          </div>
          <br />
          <Button type="submit" block color="primary" size="large">
            注册
          </Button>
        </form>
      </div>
    </div>
  );
}
