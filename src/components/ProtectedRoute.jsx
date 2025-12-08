import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Giả sử path đến token là s.auth.token
  const token = useSelector((s) => s.auth.token); 

  if (!token) {
    // Nếu không có token, chuyển hướng người dùng đến trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, hiển thị nội dung của tuyến (route)
  return children;
};

export default ProtectedRoute;