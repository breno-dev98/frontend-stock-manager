BaseTable
import { Button } from "primereact/button";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
const MarcasPage = () => {
  return (
    <PagesLayout title="Gerenciamento de Marcas">
          <BaseTable headerTitle="Lista de Marcas" />
    </PagesLayout>
  );
};

export default MarcasPage;
