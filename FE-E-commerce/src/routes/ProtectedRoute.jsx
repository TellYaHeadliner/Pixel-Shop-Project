import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userCookie = Cookies.get("user");
    const user = userCookie ? JSON.parse(userCookie) : null;
console.log(user);
    const role = user ? user.role : null; // Access the role property safely

    if (allowedRoles.includes(role)) {
        return children; // Render the child components if role is allowed
    }

    return <Navigate to="/" replace />; // Redirect to home if access is denied
};

export default ProtectedRoute;