// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
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
import PrivateRoute from "./routes/PrivateRoute";
import DashboardPage from "./pages/Dashboard";

const App = () => {

  
  return (
    <Routes>
      {/* ROTAS PÚBLICAS */}
      <Route path="/login" element={<LoginPage />} />

      {/* ROTAS PRIVADAS */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="produtos" element={<ProdutosPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="marcas" element={<MarcasPage />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="fornecedores" element={<FornecedoresPage />} />
          <Route path="entradas" element={<EntradaPage />} />
          <Route path="saidas" element={<SaidaPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="unidades" element={<UnidadesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
