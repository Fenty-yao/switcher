"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Toast, NavBar } from "antd-mobile";
import { resetPassword } from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendCode = () => {
    if (!emailOrPhone) {
      Toast.show("请输入邮箱或手机号");
      return;
    }

    setCodeSent(true);
    setTimer(60);
    Toast.show("验证码已发送");

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      Toast.show("请填写所有字段");
      return;
    }

    if (password !== confirmPassword) {
      Toast.show("两次密码不一致");
      return;
    }

    try {
      await resetPassword(emailOrPhone, password);
      Toast.show("密码重置成功");
      router.push("/login");
    } catch (err: any) {
      Toast.show(err.message || "重置失败");
    }
  };

  return (
    <div className="app">
      <NavBar className="reset-password-bar" onBack={() => router.push("/login")}>
        登录
      </NavBar>
      <div className="login-container body">
        <h2 className="login-title">重置密码</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <Input
              placeholder="邮箱/电话号码"
              value={emailOrPhone}
              type="text"
              onChange={(value) => setEmailOrPhone(value)}
            />
          </div>
          <div className="input-group flex">
            <Input type="text" placeholder="请输入验证码" clearable />
            <Button color="primary" fill="none" onClick={sendCode}>
              {codeSent ? `${timer}s 后重发` : "发送验证码"}
            </Button>
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
          <Button type="submit" block color="primary" size="large">
            重置密码
          </Button>
        </form>
      </div>
    </div>
  );
}
