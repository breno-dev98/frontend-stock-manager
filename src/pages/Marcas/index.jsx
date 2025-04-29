import { useEffect, useState } from "react";
import { MarcaService } from "../../services/marcasService";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { marcaSchema } from "../../schemas/marcaSchema";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { InputText } from "primereact/inputtext";
import { actionsButtons, toastRef } from "../../utils/actionsButtons";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

const MarcasPage = () => {
  const [marcas, setMarcas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(marcaSchema),
    defaultValues: { nome: "" },
  });

  useEffect(() => {
    const fetchMarcas = async () => {
      const data = await MarcaService.getAll();
      setMarcas(data.marcas);
    };

    fetchMarcas();
  }, []);

  const handleEdit = async (marca) => {
    setIsEditing(true);
    reset({
      nome: marca.nome,
    });
    setModalVisible(true);
  };

  const handleDelete = async (marca) => {
    await MarcaService.delete(marca.id);
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

  const handleSave = async (data) => {
    if (isEditing) {
      const marcaAtualizada = await MarcaService.update(data.id, { nome: data.nome });
      setMarcas((prev) => prev.map((m) => (m.id === data.id ? marcaAtualizada : m)));
      setIsEditing(false);
    } else {
      const novaMarca = await MarcaService.create(data);
      setMarcas((prev) => [...prev, novaMarca]);
    }
    setModalVisible(false);
    setFormData({ nome: "" });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    reset({nome: ""})
    if (isEditing) {
      setIsEditing(false);
    }
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
        header={isEditing ? "Editar Marca" : "Adicionar Marca"}
        visible={modalVisible}
        onHide={handleCloseModal}
        onSubmit={handleSubmit(handleSave)}
      >
        {/* Conteúdo interno do modal */}
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              type="text"
              name="nome"
              autoFocus={modalVisible ? true : false}
              placeholder="Nome da marca"
              className="w-full border rounded px-2 py-1"
              invalid={errors.nome ? true : false}
            />
          )}
        />
        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default MarcasPage;
