import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);

  return (
    <PagesLayout title="Gerenciamento de Produtos">
      <BaseTable data={produtos} buttonLabel="Novo Produto" emptyMessage="Nenhum produto encontrado" headerTitle="Lista de Produtos" />
    </PagesLayout>
  );
};

export default ProdutosPage;
