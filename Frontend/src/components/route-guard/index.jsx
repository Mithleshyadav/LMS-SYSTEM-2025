import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";
function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  // ✅ Allow the route
  return <Fragment> {element}</Fragment> ;
}

export default RouteGuard;
