import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() / 1000 > exp;
    } catch (error) {
      console.error("Erro ao decodificar o Token:", error);
      return true;
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      logout(); 
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
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
