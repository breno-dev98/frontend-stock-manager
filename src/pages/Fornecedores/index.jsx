import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";

const FornecedoresPage = () => {
  const [fornecedores, setFornecedores] = useState([]);

  return (
    <PagesLayout title="Gerenciamento de Fornecedores">
      <BaseTable
        data={fornecedores}
        buttonLabel="Novo Fornecedor"
        emptyMessage="Nenhum fornecedor encontrado"
        headerTitle="Lista de Fornecedores"
      />
    </PagesLayout>
  );
};

export default FornecedoresPage;
