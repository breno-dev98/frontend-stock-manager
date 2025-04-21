import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";

const EntradaPage = () => {
  const [entradas, setEntradas] = useState([]);

  return (
    <PagesLayout title="Entrada de Estoque">
      <BaseTable data={entradas} buttonLabel="Registrar Entrada" emptyMessage="Nenhuma entrada registrada" headerTitle="Registro de Entrada" />
    </PagesLayout>
  );
};

export default EntradaPage;
