import React from "react";
import { useAuthContext } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthContext();
  if (!currentUser) {
    return <Navigate to="/" replace={true} />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoute;
