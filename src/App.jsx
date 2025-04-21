// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
