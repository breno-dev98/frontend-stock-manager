import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { useEffect, useState } from "react";
import { actionsButtons } from "../../utils/actionsButtons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToastMessage } from "../../hooks/useToastMessage";
import { ProdutoService } from "../../services/produtoService";
import { SaidaService } from "../../services/saidaService"; // serviço hipotético
import FormSaida from "../../components/forms/FormSaidas"; // componente separado do formulário
import { saidaSchema } from "../../schemas/saidaSchema"; // schema Zod para validação
import { formatarMoeda } from "../../utils/masks";
import { Toast } from "primereact/toast";

const SaidaPage = () => {
  const { toastRef, showSuccess, showError } = useToastMessage();

  const [saidas, setSaidas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const columns = [
    { field: "produto_id", header: "Produto", body: (row) => produtos.find((p) => p.id === row.produto_id)?.nome || "-" },
    { field: "quantidade", header: "Quantidade", body: (row) => parseFloat(row.quantidade).toFixed(2) },
    { field: "user_id", header: "Responsável", body: (row) => row.user_id.nome },
    {
      field: "data_saida",
      header: "Data",
      body: (row) => (row.data_saida ? format(new Date(row.data_saida), "dd/MM/yyyy", { locale: ptBR }) : ""),
    },
    { field: "preco_unitario", header: "Preço Unitário", body: (row) => formatarMoeda(row.preco_unitario) },
    { field: "total", header: "Total", body: (row) => formatarMoeda(row.quantidade * row.preco_unitario) },
    { field: "motivo", header: "Motivo" },
    {
      field: "acoes",
      header: "Ações",
      body: (row) =>
        actionsButtons(row, {
          onEdit: handleEdit,
          onDelete: handleDelete,
        }),
    },
  ];

  useEffect(() => {
    async function fetchProdutos() {
      const data = await ProdutoService.getAll();
      setProdutos(data.produtos);
    }

    async function fetchSaidas() {
      const data = await SaidaService.getAll();
      setSaidas(data.saidas);
    }

    fetchProdutos();
    fetchSaidas();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(saidaSchema),
    defaultValues: { produto_id: "", quantidade: "", data_saida: "", preco_unitario: "" },
  });

  const handleCloseModal = () => {
    setModalVisible(false);
    reset({
      produto_id: "",
      quantidade: "",
      data_saida: "",
      preco_unitario: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (saida) => {
    setEditId(saida.id);
    setIsEditing(true);
    reset({
      produto_id: saida.produto_id,
      quantidade: Number(saida.quantidade),
      data_saida: saida.data_saida,
      preco_unitario: Number(saida.preco_unitario),
    });
    setModalVisible(true);
  };

  const handleDelete = async (saida) => {
    try {
      await SaidaService.delete(saida.id);
      setSaidas((prev) => prev.filter((s) => s.id !== saida.id));
      showSuccess("Saída deletada com sucesso!");
    } catch (error) {
      showError("Erro ao deletar saída.");
    }
  };

  const handleSave = async (data) => {
    if (isEditing) {
      try {
        const saidaAtualizada = await SaidaService.update(editId, data);
        setSaidas((prev) => prev.map((s) => (s.id === editId ? saidaAtualizada.saida : s)));
        showSuccess("Atualização realizada com sucesso!");
      } catch (error) {
        showError("Erro ao atualizar saída.");
      }
    } else {
      try {
        const novaSaida = await SaidaService.create(data);
        setSaidas((prev) => [...prev, novaSaida.saida]);
        showSuccess("Cadastro realizado com sucesso!");
      } catch (error) {
        showError("Erro ao registrar saída.");
      }
    }
    handleCloseModal();
  };

  return (
    <PagesLayout title="Saída de Estoque">
      <BaseTable
        data={saidas}
        columns={columns}
        sortable
        buttonLabel="Registrar Saída"
        emptyMessage="Nenhuma saída registrada"
        headerTitle="Registro de Saída"
        onClick={() => setModalVisible(true)}
      />

      <BaseModal
        header={isEditing ? "Editar Saída" : "Registrar Saída"}
        visible={modalVisible}
        onHide={handleCloseModal}
        onSubmit={handleSubmit(handleSave)}
      >
        <FormSaida control={control} errors={errors} produtos={produtos} modalVisible={modalVisible} />
      </BaseModal>

      <Toast ref={toastRef} />
    </PagesLayout>
  );
};

export default SaidaPage;
