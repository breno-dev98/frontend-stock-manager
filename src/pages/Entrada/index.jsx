import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { useEffect, useState } from "react";
import { actionsButtons } from "../../utils/actionsButtons";
import { InputNumber } from "primereact/inputnumber";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useToastMessage } from "../../hooks/useToastMessage";
import { FornecedorService } from "../../services/fornecedoresService";
import { ProdutoService } from "../../services/produtoService";
import { formatarMoeda } from "../../utils/masks";
import { Dropdown } from "primereact/dropdown";
import { entradaSchema } from "../../schemas/entradaSchema";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { EntradaService } from "../../services/entradaService";

const EntradaPage = () => {
  const { toastRef, showSuccess, showError } = useToastMessage();
  const [entradas, setEntradas] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const columns = [
    { field: "produto_id", header: "Produto", body: (rowData) => produtos.find((p) => p.id === rowData.produto_id)?.nome || "-" },
    {
      field: "quantidade",
      header: "Quantidade",
      body: (rowData) => {
        const produto = produtos?.find?.((p) => p.id === rowData.produto_id);
        const quantidade = parseFloat(rowData.quantidade); // conversão segura

        if (!produto || isNaN(quantidade)) return rowData.quantidade;

        const isKg = produto.unidade_medida === "KG";
        return quantidade.toFixed(isKg ? 3 : 2);
      },
    },
    { field: "fornecedor_id", header: "Fornecedor", body: (rowData) => fornecedores.find((f) => f.id === rowData.fornecedor_id)?.nome || "-" },
    {
      field: "data_entrada",
      header: "Data de Entrada",
      body: (rowData) => (rowData.data_entrada ? format(new Date(rowData.data_entrada), "dd/MM/yyyy", { locale: ptBR }) : ""),
    },
    { field: "preco_compra", header: "Preço Unit.", body: (rowData) => formatarMoeda(rowData.preco_compra) },
    { field: "total", header: "Total", body: (rowData) => formatarMoeda(rowData.quantidade * rowData.preco_compra) },
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
    async function fetchProdutos() {
      const data = await ProdutoService.getAll();
      setProdutos(data.produtos);
    }
    async function fetchFornecedores() {
      const data = await FornecedorService.getAll();
      setFornecedores(data.fornecedores);
    }

    async function fetchEntradas() {
      const data = await EntradaService.getAll();

      setEntradas(data.entradas);
    }

    fetchProdutos();
    fetchFornecedores();
    fetchEntradas();
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(entradaSchema),
    defaultValues: { produto_id: "", quantidade: "", fornecedor_id: "", data_entrada: "", preco_compra: "" },
  });

  const handleCloseModal = () => {
    setModalVisible(false);
    reset();
    if (isEditing) {
      setIsEditing(false);
    }
  };

  const handleEdit = async (entrada) => {
    setEditId(entrada.id);
    setIsEditing(true);
    reset({
      produto_id: entrada.produto_id,
      quantidade: Number(entrada.categoria_id),
      fornecedor_id: entrada.fornecedor_id,
      data_entrada: entrada.data_entrada,
      preco_compra: Number(entrada.preco_compra),
    });
    setModalVisible(true);
  };

  const handleDelete = async (entrada) => {
    await EntradaService.delete(entrada.id);
    setEntradas((prev) => prev.filter((e) => e.id !== entrada.id));
    showSuccess("Item deletado com sucesso!");
  };

  const handleSave = async (data) => {
    if (isEditing) {
      try {
        const entradaAtualizada = await EntradaService.update(editId, data);
        setEntradas((prev) => prev.map((m) => (m.id === editId ? entradaAtualizada.entrada : m)));
        setIsEditing(false);
        handleCloseModal();
        showSuccess("Atualização realizada com sucesso!");
      } catch (error) {
        showError("Erro ao atualizar produto");
      }
    } else {
      try {
        const novaEntrada = await EntradaService.create(data);
        setEntradas((prev) => [...prev, novaEntrada.entrada]);
        handleCloseModal();
        showSuccess("Cadastro realizado com sucesso!");
      } catch (error) {
        showError("Erro ao registrar entrada");
        handleCloseModal();
      }
    }
    setModalVisible(false);
  };

  return (
    <PagesLayout title="Entrada de Estoque">
      <BaseTable
        data={entradas}
        columns={columns}
        sortable
        onClick={() => setModalVisible(true)}
        buttonLabel="Registrar Entrada"
        emptyMessage="Nenhuma entrada registrada"
        headerTitle="Registro de Entrada"
      />

      <BaseModal
        header={isEditing ? "Editar Entrada" : "Registrar Entrada"}
        visible={modalVisible}
        onHide={handleCloseModal}
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Produto */}
            <Controller
              name="produto_id"
              control={control}
              render={({ field }) => <Dropdown {...field} options={produtos} optionLabel="nome" optionValue="id" placeholder="Produto" />}
            />
            {errors.produto_id && <span className="text-red-500">{errors.produto_id.message}</span>}
            {/* Fornecedor */}
            <Controller
              name="fornecedor_id"
              control={control}
              render={({ field }) => <Dropdown {...field} options={fornecedores} optionLabel="nome" optionValue="id" placeholder="Fornecedor" />}
            />
            {errors.fornecedor_id && <span className="text-red-500">{errors.fornecedor_id.message}</span>}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {/* Quantidade */}
            <Controller
              name="quantidade"
              control={control}
              render={({ field }) => (
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  options={produtos}
                  useGrouping={false}
                  placeholder="Quantidade"
                />
              )}
            />
            {errors.quantidade && <span className="text-red-500">{errors.quantidade.message}</span>}
            {/* Preço de Compra */}
            <Controller
              name="preco_compra"
              control={control}
              render={({ field }) => (
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  locale="pt-br"
                  mode="currency"
                  currency="BRL"
                  placeholder="Preço Unitário"
                />
              )}
            />
            {errors.preco_compra && <span className="text-red-500">{errors.preco_compra.message}</span>}
            {/* data de Compra */}
            <Controller
              name="data_entrada"
              control={control}
              render={({ field }) => (
                <Calendar
                  value={field.value ? new Date(field.value) : null}
                  onChange={(e) => {
                    const date = e.value;
                    const formatted = date ? format(date, "yyyy-MM-dd") : "";
                    field.onChange(formatted);
                  }}
                  placeholder="Data"
                  dateFormat="dd/mm/yy"
                />
              )}
            />
            {errors.data_entrada && <span className="text-red-500">{errors.data_entrada.message}</span>}
          </div>
          <InputTextarea placeholder="Observações" />
        </div>
      </BaseModal>
    </PagesLayout>
  );
};

export default EntradaPage;
