import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() / 1000 > exp;
    } catch (error) {
      console.error("Erro ao decodificar o Token:", error);
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        setAuth({
          isAuthenticated: true,
          token: token,
        });
      }
    }
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      logout(); // Redireciona para login se não tiver token ou estiver expirado
    } else {
      setAuth({
        isAuthenticated: true,
        token: token,
      });
    }
  };

   useEffect(() => {
     checkToken(); // Verifica na primeira montagem
   }, []);

   useEffect(() => {
     checkToken(); // Verifica sempre que a rota mudar
   }, [location]);

  const login = (token) => {
    localStorage.setItem("token", token); // Armazena o token no localStorage
    setAuth({
      isAuthenticated: true,
      token: token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setAuth({
      isAuthenticated: false,
      token: null,
    });
    navigate("/login");
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
