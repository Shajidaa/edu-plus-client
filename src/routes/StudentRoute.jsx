import React from "react";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const StudentRoute = (children) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "student") return children;
  return <Navigate to="/" replace="true" />;
};

export default StudentRoute;
