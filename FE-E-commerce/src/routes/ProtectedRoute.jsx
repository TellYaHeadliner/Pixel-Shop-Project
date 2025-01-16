// src/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext'; 
import { Spin } from 'antd';


const ProtectedRoute = ({ children, allowedRoles }) => {
    const { role , loading } = useContext(UserContext); 

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (allowedRoles.includes(role)) {
        return children; 
    }

    return <Navigate to="/" replace />; 
};

export default ProtectedRoute;