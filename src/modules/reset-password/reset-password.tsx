import React, { useState } from "react";
import cx from "classnames";
import { Input, Button, Toast, Form, NavBar } from "antd-mobile";
import { Footer } from "../framework";
import "./reset-password.css";

const ResetPassword: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendCode = () => {
    if (!emailOrPhone) {
      Toast.show("Please enter your email or phone");
      return;
    }

    setCodeSent(true);
    setTimer(60);
    Toast.show("Verification code sent");

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

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      Toast.show("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Toast.show("Passwords do not match");
      return;
    }

    Toast.show("Password reset successfully");
    // Add your password reset logic here
  };

  return (
    <div className="app">
      <NavBar className="reset-password-bar" back="登录"></NavBar>
      <div className="login-container body">
        <h2 className="login-title">重置密码</h2>
        <form className="form">
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
              {codeSent ? `Resend in ${timer}s` : "发送验证码"}
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
          <br />
          <Button block size="large" color="primary" onClick={handleSubmit}>
            重置密码
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
