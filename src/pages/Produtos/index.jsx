import { useEffect, useState } from "react";
import PagesLayout from "../../components/Layout/PagesLayout";
import BaseTable from "../../components/ui/BaseTable";
import BaseModal from "../../components/ui/BaseModal";
import { ProdutoService } from "../../services/produtoService";
import { actionsButtons } from "../../utils/actionsButtons";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useToastMessage } from "../../hooks/useToastMessage";
import { produtoSchema } from "../../schemas/produtoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { MarcaService } from "../../services/marcasService";
import { CategoriaService } from "../../services/categoriasService";
import { FornecedorService } from "../../services/fornecedoresService";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

const ProdutosPage = () => {
  const { toastRef, showSuccess, showError } = useToastMessage();
  const [produtos, setProdutos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const unidades = [
    { nome: "Unidade", value: "UNIDADE" },
    { nome: "Kg", value: "KG" },
    { nome: "Litro", value: "LITRO" },
    { nome: "Caixa", value: "CX" },
    { nome: "Pacote", value: "PC" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(produtoSchema),
    defaultValues: { nome: "", descricao: "", preco_custo: "", preco_venda: "", quantidade: 0, unidade_medida: "", marca_id: "", categoria_id: "", fornecedor_id: "" },
  });

  useEffect(() => {
    const fetFornecedores = async () => {
      const data = await FornecedorService.getAll();      
      setFornecedores(data.fornecedores);
    };
    const fetchCategorias = async () => {
      const data = await CategoriaService.getAll();      
      setCategorias(data.categorys);
    };
    const fetchMarcas = async () => {
      const data = await MarcaService.getAll();      
      setMarcas(data.marcas);
    };
    const fetchProdutos = async () => {
      const data = await ProdutoService.getAll();
      setProdutos(data.produtos);
    };
    fetFornecedores();
    fetchCategorias();
    fetchMarcas();
    fetchProdutos();
  }, []);

  const handleEdit = async (produto) => {
    setEditId(produto.id);
    setIsEditing(true);
    reset({
      nome: produto.nome,
    });
    setModalVisible(true);
  };

  const handleDelete = async (produto) => {
    await ProdutoService.delete(produto.id);
    setProdutos((prev) => prev.filter((p) => p.id !== produto.id));
    showSuccess("Item deletado com sucesso!");
  };

  const columns = [
    { field: "nome", header: "Nome" },
    { field: "descricao", header: "Descrição" },
    { field: "preco_custo", header: "Preço Custo" },
    { field: "preco_venda", header: "Preço Venda" },
    { field: "quantidade", header: "Quantidade" },
    { field: "unidade_medida", header: "Embalagem" },
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
      try {
        const produtoAtualizado = await ProdutoService.update(editId, data);
        setProdutos((prev) => prev.map((m) => (m.id === editId ? produtoAtualizado : m)));
        setIsEditing(false);
        handleCloseModal();
        showSuccess("Atualização realizada com sucesso!");
      } catch (error) {
        showError("Erro ao atualizar produto");
      }
    } else {
      try {
        const novoProduto = await ProdutoService.create(data);
        setProdutos((prev) => [...prev, novoProduto]);
        handleCloseModal();
        showSuccess("Cadastro realizado com sucesso!");
      } catch (error) {
        showError("Erro ao cadastrar produto");
        handleCloseModal();
      }
    }
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    reset({ nome: "" });
    if (isEditing) {
      setIsEditing(false);
    }
  };

  return (
    <PagesLayout title="Gerenciamento de Produtos">
      <BaseTable
        data={produtos}
        columns={columns}
        buttonLabel="Novo Produto"
        emptyMessage="Nenhum produto encontrado"
        headerTitle="Lista de Produtos"
        onClick={() => setModalVisible(true)}
      />

      <BaseModal
        header={isEditing ? "Editar Produto" : "Adicionar Produto"}
        visible={modalVisible}
        onHide={handleCloseModal}
        onSubmit={handleSubmit(handleSave)}
      >
        {/* Nome */}
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              type="text"
              autoFocus={modalVisible}
              placeholder="Nome do produto"
              className="w-full border rounded px-2 py-1"
              invalid={!!errors.nome}
            />
          )}
        />
        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}

        {/* Descrição */}
        <Controller
          name="descricao"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              type="text"
              placeholder="Descrição (opcional)"
              className="w-full border rounded px-2 py-1"
              invalid={!!errors.descricao}
            />
          )}
        />
        {errors.descricao && <span className="text-red-500">{errors.descricao.message}</span>}

        {/* Preço de Custo */}
        <Controller
          name="preco_custo"
          control={control}
          render={({ field }) => (
            <InputNumber
              value={field.value}
              onValueChange={(e) => field.onChange(e.value)}
              locale="pt-br"
              mode="currency"
              currency="BRL"
              placeholder="Preço de custo"
              className="w-full rounded"
              invalid={!!errors.preco_custo}
            />
          )}
        />
        {errors.preco_custo && <span className="text-red-500">{errors.preco_custo.message}</span>}

        {/* Preço de Venda */}
        <Controller
          name="preco_venda"
          control={control}
          render={({ field }) => (
            <InputNumber
              value={field.value}
              onValueChange={(e) => field.onChange(e.value)}
              locale="pt-br"
              mode="currency"
              currency="BRL"
              placeholder="Preço de venda"
              className="w-full rounded"
              invalid={!!errors.preco_venda}
            />
          )}
        />
        {errors.preco_venda && <span className="text-red-500">{errors.preco_venda.message}</span>}

        {/* Quantidade */}
        <Controller
          name="quantidade"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              type="number"
              step="0.001"
              placeholder="Quantidade"
              className="w-full border rounded"
              invalid={!!errors.quantidade}
            />
          )}
        />
        {errors.quantidade && <span className="text-red-500">{errors.quantidade.message}</span>}

        {/* Unidade de Medida */}
        <Controller
          name="unidade_medida"
          control={control}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={unidades}
              optionLabel="nome"
              optionValue="value"
              placeholder="Escolha uma unidade de medida"
              className={`w-full border rounded ${errors.unidade_medida ? "border-red-500" : ""}`}
            />
          )}
        />
        {errors.unidade_medida && <span className="text-red-500">{errors.unidade_medida.message}</span>}

        {/* Marca ID */}
        <Controller
          name="marca_id"
          control={control}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={marcas}
              optionLabel="nome"
              optionValue="id"
              placeholder="Selecione uma marca (Opcional)"
              className={`w-full border rounded ${errors.marca_id ? "border-red-500" : ""}`}
            />
          )}
        />
        {errors.marca_id && <span className="text-red-500">{errors.marca_id.message}</span>}

        {/* Categoria ID */}
        <Controller
          name="categoria_id"
          control={control}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={categorias}
              optionLabel="nome"
              optionValue="id"
              placeholder="Selecione uma categoria (Opcional)"
              className={`w-full border rounded ${errors.categoria_id ? "border-red-500" : ""}`}
            />
          )}
        />
        {errors.categoria_id && <span className="text-red-500">{errors.categoria_id.message}</span>}

        {/* Fornecedor ID */}
        <Controller
          name="fornecedor_id"
          control={control}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={fornecedores}
              optionLabel="nome"
              optionValue="id"
              placeholder="Selecione um fornecedor (Opcional)"
              className={`w-full border rounded ${errors.fornecedor_id ? "border-red-500" : ""}`}
            />
          )}
        />
        {errors.fornecedor_id && <span className="text-red-500">{errors.fornecedor_id.message}</span>}
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default ProdutosPage;
