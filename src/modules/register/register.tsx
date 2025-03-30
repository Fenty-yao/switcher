import React, { useState } from 'react';
import { Button, Input, NavBar, Toast } from 'antd-mobile';
import { register } from './register-api';
import { redirect } from 'react-router';
import './register.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!username || !password || !confirmPassword) {
            Toast.show({
                icon: 'fail',
                content: 'Please fill in all fields',
            });
            return;
        }
        register(username, password).then(() => {
            redirect('/community-search');
        }).catch(() => {
            Toast.show({
                icon: 'fail',
                content: 'Login failed',
            });
        });
    };

    return (
        <div>
            <NavBar className='register-bar' back="登录" />
            <div className="login-container">
                <h2 className='login-title'>注册</h2>
                <form className='login-form'>
                    <div className="input-group">
                        <Input
                            placeholder="邮箱/电话号码"
                            value={username}
                            type='text'
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
                    <Button block color="primary" size="large" onClick={handleRegister}>
                        注册
                    </Button>
                </form>
            </div>
        </div>


    );
};

export default Login;