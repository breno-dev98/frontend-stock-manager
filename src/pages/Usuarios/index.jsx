import { useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  return (
    <PagesLayout title="Gerenciamento de Usuários">
      <BaseTable data={usuarios} buttonLabel="Novo Usuário" emptyMessage="Nenhum usuário encontrado" headerTitle="Lista de Usuários" />
    </PagesLayout>
  );
};

export default UsuariosPage;
