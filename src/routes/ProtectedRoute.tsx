// import { Navigate, Outlet } from "react-router-dom";

import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const authenticated = Boolean(localStorage.getItem("accessToken"));

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
