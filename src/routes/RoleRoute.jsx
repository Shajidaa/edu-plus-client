import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const RoleRoute = ({ children, allowedRoles }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <p>loading.........</p>;
  if (allowedRoles.includes(role)) return children;

  return <Navigate to="/" replace="true" />;
};

export default RoleRoute;
