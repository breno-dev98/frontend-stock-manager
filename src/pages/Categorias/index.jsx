import { useEffect, useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import { CategoriaService } from "../../services/categoriasService"
const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await CategoriaService.getAll();
      setCategorias(data.categorys)      
    } 
    fetchCategorias()    
  }, [])

  return (
    <PagesLayout title="Gerenciamento de Categorias">
      <BaseTable data={categorias} buttonLabel="Nova Categoria" emptyMessage="Nenhuma categoria encontrada" headerTitle="Lista de Categorias" />
    </PagesLayout>
  );
};

export default CategoriasPage;
