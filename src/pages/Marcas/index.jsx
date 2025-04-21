import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
const MarcasPage = () => {
    const [marcas, setMarcas] = useState([])
  return (
    <PagesLayout title="Gerenciamento de Marcas">
          <BaseTable buttonLabel="Nova Marca" data={marcas} emptyMessage="Nenhuma marca encontrada"  headerTitle="Lista de Marcas" />
    </PagesLayout>
  );
};

export default MarcasPage;
