import React, { useEffect } from 'react';
import { Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../shared/api/axiosInstance'; // Use your configured axios instance

const { Text } = Typography;

const LogOut: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await apiClient.get('/logout'); // Ensures same base URL
            } catch (error) {
                // Optionally handle error
            } finally {
                localStorage.clear();
                navigate('/login', { replace: true });
            }
        };
        logout();
    }, [navigate]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <Spin size="large" />
            <Text style={{ marginTop: 16 }}>Logging out, please wait...</Text>
        </div>
    );
};

export default LogOut;
