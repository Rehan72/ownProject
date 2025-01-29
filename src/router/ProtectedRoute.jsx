import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
