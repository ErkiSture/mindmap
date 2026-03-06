import { Navigate } from "react-router-dom";
import type { User } from "../types/user";

type ProtectedRouteProps = {
  user : User | null;
  children: React.ReactNode;
  loadingUser: boolean;
}

export default function ProtectedRoute({ user, children, loadingUser }: ProtectedRouteProps) {

  if (loadingUser) {
    return <div>Loading...</div>
  }

  else if (!user) {
    return <Navigate to="/login" replace />;
  }

  else {
    return children
  }
}