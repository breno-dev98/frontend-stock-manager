import { useEffect, useState } from "react";
import { MarcaService } from "../../services/marcasService";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { InputText } from "primereact/inputtext";
import { actionsButtons, toastRef } from "../../utils/actionsButtons";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
const MarcasPage = () => {
  const [marcas, setMarcas] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ nome: "" });

  const handleEdit = async (marca) => {
    setIsEditing(true)
    setFormData({ id: marca.id, nome: marca.nome });
    setModalVisible(true);
  };


  const handleDelete = async (marca) => {    
    await MarcaService.delete(marca.id)
    setMarcas((prev) => prev.filter((m) => m.id !== marca.id));
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

  useEffect(() => {
    const fetchMarcas = async () => {
      const data = await MarcaService.getAll();
      setMarcas(data.marcas);
    };

    fetchMarcas();
  }, []);

  const handleSave = async () => {
    if (isEditing) {
      const marcaAtualizada = await MarcaService.update(formData.id, {nome: formData.nome});
      setMarcas((prev) => prev.map((m) => (m.id === formData.id ? marcaAtualizada : m)));
      setIsEditing(false)
    } else {
      const novaMarca =  await MarcaService.create(formData);
       setMarcas((prev) => [...prev, novaMarca] )
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
    <PagesLayout title="Gerenciamento de Marcas">
      <BaseTable
        buttonLabel="Nova Marca"
        data={marcas}
        columns={columns}
        emptyMessage="Nenhuma marca encontrada"
        headerTitle="Lista de Marcas"
        onClick={() => setModalVisible(true)}
      />

      <BaseModal
        header={formData.nome.trim() !== "" ? "Editar Marca" : "Adicionar Marca"}
        visible={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setFormData({ nome: "" });
          setIsEditing(false)
        }}
        onSave={handleSave}
      >
        {/* Conteúdo interno do modal */}
        <InputText
          onChange={handleInputChange}
          value={formData.nome}
          type="text"
          name="nome"
          autoFocus={modalVisible ? true : false}
          placeholder="Nome da marca"
          className="w-full border rounded px-2 py-1"
        />
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default MarcasPage;
