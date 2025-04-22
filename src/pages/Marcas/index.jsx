import { useEffect, useState } from "react";
import { MarcaService } from "../../services/marcasService";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { InputText } from "primereact/inputtext";
const MarcasPage = () => {
  const [marcas, setMarcas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ nome: "" });
  const columns = [
    { field: "nome", header: "Nome" },
    { field: "acoes", header: "Ações" },
  ];

  useEffect(() => {
    const fetchMarcas = async () => {
      const data = await MarcaService.getAll();
      setMarcas(data.marcas);
    };

    fetchMarcas();
  }, []);

  const handleSave = async () => {
   const novaMarca =  await MarcaService.create(formData);
    setModalVisible(false);
    setFormData({ nome: "" });
    setMarcas((prev) => [...prev, novaMarca] )
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

      <BaseModal header="Adicionar Marca" visible={modalVisible} onHide={() => setModalVisible(false)} onSave={handleSave}>
        {/* Conteúdo interno do modal */}
        <InputText onChange={handleInputChange} value={formData.nome} type="text" name="nome" placeholder="Nome da marca" className="w-full border rounded px-2 py-1" />
      </BaseModal>
    </PagesLayout>
  );
};

export default MarcasPage;
