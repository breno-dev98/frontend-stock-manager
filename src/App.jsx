// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/authContext";
import Layout from "./components/Layout/MainLayout";
import MarcasPage from "./pages/Marcas";
import CategoriasPage from "./pages/Categorias";
import ProdutosPage from "./pages/Produtos";
import EntradaPage from "./pages/Entrada";
import SaidaPage from "./pages/Saida";
import FornecedoresPage from "./pages/Fornecedores";
import UnidadesPage from "./pages/Unidades";
import UsuariosPage from "./pages/Usuarios";
import LoginPage from "./pages/Login";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";

const App = () => {
  const { auth } = useContext(AuthContext);
  
  return (
    <Routes>
      {/* ROTAS PÚBLICAS */}
      <Route path="/login" element={!auth.isAuthenticated && <LoginPage />} />

      {/* ROTAS PRIVADAS */}
      {auth.isAuthenticated && (
        <Route path="/" element={<Layout />}>
          <Route path="produtos" element={<ProdutosPage />} />
          <Route path="marcas" element={<MarcasPage />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="fornecedores" element={<FornecedoresPage />} />
          <Route path="entradas" element={<EntradaPage />} />
          <Route path="saidas" element={<SaidaPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="unidades" element={<UnidadesPage />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
