import { Navigate, Outlet } from "react-router";
import { useApp } from "../contexts/AppContext";

export function ProtectedRoute() {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
