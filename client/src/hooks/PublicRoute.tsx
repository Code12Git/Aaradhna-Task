import { Navigate } from "react-router-dom";
import useAuth from "./auth";
import type { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { userData, token } = useAuth();

  if (userData && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};