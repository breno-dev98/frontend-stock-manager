import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";

const UnidadesPage = () => {
  const [unidades, setUnidades] = useState([]);

  return (
    <PagesLayout title="Unidades de Medida">
      <BaseTable
        data={unidades}
        buttonLabel="Nova Unidade"
        emptyMessage="Nenhuma unidade de medida encontrada"
        headerTitle="Lista de Unidades de Medida"
      />
    </PagesLayout>
  );
};

export default UnidadesPage;
