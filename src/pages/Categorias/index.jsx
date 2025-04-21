import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);

  return (
    <PagesLayout title="Gerenciamento de Categorias">
      <BaseTable data={categorias} buttonLabel="Nova Categoria" emptyMessage="Nenhuma categoria encontrada" headerTitle="Lista de Categorias" />
    </PagesLayout>
  );
};

export default CategoriasPage;
