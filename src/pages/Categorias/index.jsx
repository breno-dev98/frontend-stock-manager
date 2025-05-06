import { useEffect, useState, useRef } from "react";
import { CategoriaService } from "../../services/categoriasService";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { InputText } from "primereact/inputtext";
import { actionsButtons } from "../../utils/actionsButtons";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoriaSchema } from "../../schemas/categoriaSchema";
import { useToastMessage } from "../../hooks/useToastMessage";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { toastRef, showSuccess, showError } = useToastMessage();
  const inputRef = useRef(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categoriaSchema),
    defaultValues: { nome: "" },
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await CategoriaService.getAll();
      setCategorias(data.categorys);
    };
    fetchCategorias();
  }, []);

  const handleEdit = async (categoria) => {
    setEditId(categoria.id);
    setIsEditing(true);
    reset({
      nome: categoria.nome,
    });
    setModalVisible(true);
  };

  const handleDelete = async (categoria) => {
    await CategoriaService.delete(categoria.id);
    setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));
    showSuccess("Item deletado com sucesso!");
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
    try {
      if (isEditing) {
        const categoriaAtualizada = await CategoriaService.update(editId, data);
        setCategorias((prev) => prev.map((m) => (m.id === editId ? categoriaAtualizada.category : m)));
        setIsEditing(false);
        showSuccess("Categoria atualizada com sucesso!");
      } else {
        const novaCategoria = await CategoriaService.create(data);
        setCategorias((prev) => [...prev, novaCategoria.category]);
        showSuccess("Categoria criada com sucesso!");
      }
      handleCloseModal();
    } catch (error) {
      if (isEditing) {
        showError("Erro ao atualizar categoria");
      } else {
        showError("Erro ao salvar categoria");
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    reset({ nome: "" });
    setIsEditing(false);
  };

  return (
    <PagesLayout title="Gerenciamento de Categorias">
      <BaseTable
        data={categorias}
        columns={columns}
        sortable
        buttonLabel="Nova Categoria"
        emptyMessage="Nenhuma categoria encontrada"
        headerTitle="Lista de Categorias"
        onClick={() => setModalVisible(true)}
      />

      <BaseModal
        header={isEditing ? "Editar Categoria" : "Adicionar Categoria"}
        visible={modalVisible}
        onHide={handleCloseModal}
        onSubmit={handleSubmit(handleSave)}
      >
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              type="text"
              name="nome"
              ref={inputRef}
              autoComplete="off"
              autoFocus={modalVisible ? true : false}
              placeholder="Nome da categoria"
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

export default CategoriasPage;
