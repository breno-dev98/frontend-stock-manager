import { useEffect, useState } from "react";
import { FornecedorService } from "../../services/fornecedoresService";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { actionsButtons, toastRef } from "../../utils/actionsButtons";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { removeMascara } from "../../utils/removerMascara"
import { formatarCNPJ, formatarTelefone } from "../../utils/masks";

const FornecedoresPage = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({ nome: "", cnpj: null, telefone: null, email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchFornecedores = async () => {
      const data = await FornecedorService.getAll();
      setFornecedores(data.fornecedores);
    };
    fetchFornecedores();
  }, []);

  const handleEdit = (fornecedor) => {
    setIsEditing(true);
    setFormData({
      id: fornecedor.id,
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      telefone: fornecedor.telefone,
      email: fornecedor.email,
    });
    setModalVisible(true);
  };

  const handleDelete = async (fornecedor) => {
    await FornecedorService.delete(fornecedor.id);
    setFornecedores((prev) => prev.filter((f) => f.id !== fornecedor.id));
  };

  const handleSave = async () => {
    const dadosLimpos = {
      ...formData,
      cnpj: removeMascara(formData.cnpj),
      telefone: removeMascara(formData.telefone),
    };
    if (isEditing) {
      const fornecedorAtualizado = await FornecedorService.update(formData.id, dadosLimpos);
      setFornecedores((prev) => prev.map((f) => (f.id === formData.id ? fornecedorAtualizado.fornecedor : f)));
      setIsEditing(false);
    } else {
      const novoFornecedor = await FornecedorService.create(dadosLimpos);
      setFornecedores((prev) => [...prev, novoFornecedor.fornecedor]);
    }
    setModalVisible(false);
    setFormData({ nome: "", cnpj: null, telefone: null, email: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const columns = [
    { field: "nome", header: "Nome" },
    { field: "cnpj", header: "CNPJ", body: (rowData) => formatarCNPJ(rowData.cnpj) },
    { field: "telefone", header: "Telefone", body: (rowData) => formatarTelefone(rowData.telefone) },
    { field: "email", header: "E-mail" },
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

  return (
    <PagesLayout title="Gerenciamento de Fornecedores">
      <BaseTable
        data={fornecedores}
        columns={columns}
        buttonLabel="Novo Fornecedor"
        emptyMessage="Nenhum fornecedor encontrado"
        headerTitle="Lista de Fornecedores"
        onClick={() => setModalVisible(true)}
      />

      <BaseModal
        header={isEditing ? "Editar Fornecedor" : "Adicionar Fornecedor"}
        visible={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setFormData({
            nome: "",
            cnpj: null,
            telefone: null,
            email: "",
          });
          setIsEditing(false);
        }}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-2">
          <InputText
            onChange={handleInputChange}
            value={formData.nome}
            type="text"
            name="nome"
            autoComplete="off"
            autoFocus={modalVisible ? true : false}
            placeholder="Nome do fornecedor"
            className="w-full border rounded px-2 py-1"
          />
          <InputMask
            mask="99.999.999/9999-99"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
            placeholder={"CNPJ"}
            className="w-full"
          />
          <InputMask
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            mask="(99) 99999-9999"
            placeholder="Telefone"
            className="w-full"
          />
          <InputText name="email" value={formData.email} onChange={handleInputChange} placeholder="E-mail" className="w-full" />
        </div>
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default FornecedoresPage;
