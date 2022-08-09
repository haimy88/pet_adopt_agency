import React from "react";
import { useAuthContext } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const { isAdmin } = useAuthContext();
  if (!isAdmin) {
    return <Navigate to="/" replace={true} />;
  }
  return <div>{children}</div>;
};

export default ProtectedRouteAdmin;
