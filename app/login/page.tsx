"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "antd-mobile";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("请输入用户名和密码");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const userInfo = await login(username, password);
      if (userInfo.communitySelected) {
        router.push("/product-list");
      } else {
        router.push("/community-search");
      }
    } catch {
      setError("登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">登录</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <Button type="submit" block color="primary" size="large" loading={loading}>
          登录
        </Button>
        <br />
        <Button
          block
          color="default"
          size="large"
          onClick={() => router.push("/register")}
        >
          注册
        </Button>
        <div className="reset-password-link">
          <a href="/reset-password">忘记密码?</a>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
