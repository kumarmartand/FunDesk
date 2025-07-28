import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input, Button, Card, Spin, Image } from 'antd';
import apiClient from '../../shared/api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import bg_image2 from '../../assets/background.png';
import logo from '../../assets/erp_logo.png';

import './loginPage.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: any) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post('/token/', {
                email: values.email,
                password: values.password,
            });
            const { access, refresh } = response?.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            toast.success("Login successful!");
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.detail || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="login-bg"
            style={{
                backgroundImage: `url(${bg_image2})`,
            }}
        >
            <div className="login-center-container">
                <Card
                    className="login-card"
                    bordered={false}
                    style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
                >
                    <div className="logo-wrapper">
                        <Image
                            preview={false}
                            src={logo}
                            alt="Logo"
                            className="login-logo"
                        />
                    </div>
                    <h2 className="login-title">Welcome Back</h2>
                    <Form
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        autoComplete="off"
                        requiredMark={false}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Enter your email"
                                className="login-input"
                                autoComplete="username"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be at least 6 characters!' },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Enter your password"
                                className="login-input"
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={isLoading}
                                disabled={isLoading}
                                className="login-btn"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
