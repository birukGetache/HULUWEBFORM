// AuthRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  
  // Log the token to the console
  console.log('Token:', token);
  console.log('Is Authenticated:', isAuthenticated);
  
  return isAuthenticated 
    ? React.createElement(Element, rest) 
    : <Navigate to="/login" />;
};

export default AuthRoute;
