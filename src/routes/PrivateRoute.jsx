// src/routes/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = () => {
  const { auth, loading } = useContext(AuthContext);

   if (loading) {
     return null; // ou um spinner de carregamento
   }
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
