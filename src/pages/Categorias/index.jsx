import { useEffect, useState } from "react";
import { CategoriaService } from "../../services/categoriasService"
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { InputText } from "primereact/inputtext";
import { actionsButtons, toastRef } from "../../utils/actionsButtons";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({ nome: "" })
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await CategoriaService.getAll();
      setCategorias(data.categorys);
    };
    fetchCategorias();
  }, []);

   const handleEdit = async (categoria) => {
     setIsEditing(true);
     setFormData({ id: categoria.id, nome: categoria.nome });
     setModalVisible(true);
   };
  
  const handleDelete = async (categoria) => {    
      await CategoriaService.delete(categoria.id)
      setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));
    };

  const columns = [
        { field: "nome", header: "Nome" },
        {
          field: "acoes",
          header: "Ações",
          body: (rowData) =>
            actionsButtons(rowData, {
              onEdit: handleEdit,
              onDelete: handleDelete,
            }),
        },
      ]; 
  
  const handleSave = async () => {
      if (isEditing) {
        const categoriaAtualizada = await CategoriaService.update(formData.id, { nome: formData.nome });        
        setCategorias((prev) => prev.map((m) => (m.id === formData.id ? categoriaAtualizada.category : m)));
        setIsEditing(false)
      } else {
        const novaCategoria =  await CategoriaService.create(formData);
         setCategorias((prev) => [...prev, novaCategoria.category] )
      }
      setModalVisible(false);
      setFormData({ nome: ""});
  };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

  return (
    <PagesLayout title="Gerenciamento de Categorias">
      <BaseTable
        data={categorias}
        columns={columns}
        buttonLabel="Nova Categoria"
        emptyMessage="Nenhuma categoria encontrada"
        headerTitle="Lista de Categorias"
        onClick={() => setModalVisible(true)}
      />

      <BaseModal
        header={formData.nome.trim() !== "" ? "Editar Categoria" : "Adicionar Categoria"}
        visible={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setFormData({ nome: "" });
          setIsEditing(false);
        }}
        onSave={handleSave}
      >

        <InputText
          onChange={handleInputChange}
          value={formData.nome}
          type="text"
          name="nome"
          autoComplete="off"
          autoFocus={modalVisible ? true : false}
          placeholder="Nome da categoria"
          className="w-full border rounded px-2 py-1"
        />
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default CategoriasPage;
