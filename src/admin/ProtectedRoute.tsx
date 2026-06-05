import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn =
    localStorage.getItem("adminAuth") === "true" ||
    localStorage.getItem("isAdminLoggedIn") === "true";
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};
