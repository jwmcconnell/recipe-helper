import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export interface ProtectedRouteProps {
  children: ReactElement;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement {
  const { user } = useAuth0();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}
