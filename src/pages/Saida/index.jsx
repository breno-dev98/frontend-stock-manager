import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";

const SaidaPage = () => {
  const [saidas, setSaidas] = useState([]);

  return (
    <PagesLayout title="Saída de Estoque">
      <BaseTable data={saidas} buttonLabel="Registrar Saída" emptyMessage="Nenhuma saída registrada" headerTitle="Registro de Saída" />
    </PagesLayout>
  );
};

export default SaidaPage;
