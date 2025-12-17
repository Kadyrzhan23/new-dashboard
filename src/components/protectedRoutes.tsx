// components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { errorMessage } from "../services/show-message";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin: boolean;
}

const ProtectedRoute = ({ children, isAdmin }: ProtectedRouteProps) => {
  if (!isAdmin) {
    // если не админ — редирект на страницу входа
    errorMessage("Доступ только администраторам");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
