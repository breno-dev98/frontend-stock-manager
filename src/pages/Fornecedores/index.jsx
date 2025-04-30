import { useEffect, useState } from "react";
import { FornecedorService } from "../../services/fornecedoresService";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fornecedorSchema } from "../../schemas/fornecedorSchema";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { actionsButtons, toastRef } from "../../utils/actionsButtons";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { formatarCNPJ, formatarTelefone } from "../../utils/masks";
import { useToastMessage } from "../../hooks/useToastMessage";

const FornecedoresPage = () => {
  const { toastRef, showSuccess } = useToastMessage();
  const [fornecedores, setFornecedores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fornecedorSchema),
    defaultValues: {
      nome: "",
      cnpj: null,
      telefone: null,
      email: "",
    },
  });

  useEffect(() => {
    const fetchFornecedores = async () => {
      const data = await FornecedorService.getAll();
      setFornecedores(data.fornecedores);
    };
    fetchFornecedores();
  }, []);

  const handleEdit = (fornecedor) => {
    setEditId(fornecedor.id);
    setIsEditing(true);    
    reset({
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

  const handleSave = async (data) => {    
    
    if (isEditing) {
      const fornecedorAtualizado = await FornecedorService.update(editId, data);      
      setFornecedores((prev) => prev.map((f) => (f.id === editId ? fornecedorAtualizado.fornecedor : f)));
      handleCloseModal()
      showSuccess("Atualização realizada com sucesso!");
    } else {      
      const novoFornecedor = await FornecedorService.create(data);
      setFornecedores((prev) => [...prev, novoFornecedor.fornecedor]);
      handleCloseModal()
      showSuccess("Cadastro realizado com sucesso!");
    }
  };

  const handleCloseModal = () => {
    setEditId(null)
    setModalVisible(false);
    if (isEditing) {
    setIsEditing(false);
    }
    reset({nome: "", cnpj: null, email: "", telefone: null});
  }

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
        onHide={handleCloseModal}
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="flex flex-col gap-2">
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder="Nome do fornecedor"
                className="w-full border rounded px-2 py-1"
                invalid={errors.nome ? true : false}
              />
            )}
          />
          {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}

          <Controller
            name="cnpj"
            control={control}
            render={({ field }) => (
              <InputMask mask="99.999.999/9999-99" {...field} placeholder="CNPJ" value={null ? "" : field.value} className="w-full" invalid={errors.cnpj ? true : false} />
            )}
          />
          {errors.cnpj && <span className="text-red-500">{errors.cnpj.message}</span>}

          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <InputMask mask="(99) 99999-9999" {...field} placeholder="Telefone" className="w-full" invalid={errors.telefone ? true : false} />
            )}
          />
          {errors.telefone && <span className="text-red-500">{errors.telefone.message}</span>}

          <Controller
            name="email"
            control={control}
            render={({ field }) => <InputText {...field} placeholder="E-mail" className="w-full" invalid={errors.email ? true : false} />}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default FornecedoresPage;
