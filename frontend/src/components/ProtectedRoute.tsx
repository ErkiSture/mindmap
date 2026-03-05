import { Navigate } from "react-router-dom";
import type { User } from "../types/user";

type ProtectedRouteProps = {
  user : User | null;
  children: React.ReactNode;
}

export default function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children
}