// src/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Adjust the path as necessary

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { role } = useContext(UserContext); // Get the user role from context

    if (allowedRoles.includes(role)) {
        return children; // Render the child components if role is allowed
    }

    return <Navigate to="/" replace />; // Redirect to home if access is denied
};

export default ProtectedRoute;