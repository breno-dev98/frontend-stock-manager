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
import { formatarMoeda } from "../../utils/masks";
import { Button } from "primereact/button";
import {gerarEAN} from "../../utils/gerarEAN"

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
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(produtoSchema),
    defaultValues: { nome: "", descricao: "", ean: "", preco_custo: "", preco_venda: "", quantidade: 0, unidade_medida: "", marca_id: "", categoria_id: "", fornecedor_id: "" },
  });

  const unidade = watch("unidade_medida")
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
      descricao: produto.descricao,
      categoria_id: produto.categoria_id,
      marca_id: produto.marca_id,
      fornecedor_id: produto.fornecedor_id,
      ean: produto.ean,
      preco_custo: Number(produto.preco_custo),
      preco_venda: Number(produto.preco_venda),
      quantidade: produto.quantidade,
      unidade_medida: produto.unidade_medida,
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
    { field: "descricao", header: "Descrição", body: (rowData) => rowData.descricao || "-" },
    {
      field: "marca",
      header: "Marca",
      body: (rowData) => marcas.find((c) => c.id === rowData.marca_id)?.nome || "-",
    },
    {
      field: "categoria",
      header: "Categoria",
      body: (rowData) => categorias.find((c) => c.id === rowData.categoria_id)?.nome || "-",
    },
    {
      field: "fornecedor",
      header: "Fornecedor",
      body: (rowData) => fornecedores.find((c) => c.id === rowData.fornecedor_id)?.nome || "-",
    },
    { field: "ean", header: "EAN" },
    { field: "preco_custo", header: "Preço Custo", body: (rowData) => formatarMoeda(rowData.preco_custo) },
    { field: "preco_venda", header: "Preço Venda", body: (rowData) => formatarMoeda(rowData.preco_venda) },
    {
      field: "quantidade",
      header: "Quantidade",
      body: (rowData) => {
        const unidade = rowData.unidade_medida;
        const quantidade = Number(rowData.quantidade);

        if (isNaN(quantidade)) return "-";

        // Formata com base na unidade
        const casasDecimais = unidade === "KG" ? 3 : 2;

        return quantidade.toFixed(casasDecimais);
      },
    },
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

  const handleGenerateEAN = () => {
    const eangerado = gerarEAN()
    setValue("ean", eangerado);
  }

  const handleSave = async (data) => {
    if (isEditing) {
      try {
        const produtoAtualizado = await ProdutoService.update(editId, data);
        setProdutos((prev) => prev.map((m) => (m.id === editId ? produtoAtualizado.produto : m)));
        setIsEditing(false);
        handleCloseModal();
        showSuccess("Atualização realizada com sucesso!");
      } catch (error) {
        showError("Erro ao atualizar produto");
      }
    } else {
      try {
        const novoProduto = await ProdutoService.create(data);
        setProdutos((prev) => [...prev, novoProduto.produto]);
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
        sortable
        sortMode="multiple"
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

        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
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
          </div>

          <div className="flex">
            {/* Quantidade */}
            <Controller
              name="quantidade"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="number"
                  mode="decimal"
                  minFractionDigits={field.value && unidade === "KG" ? 3 : 0}
                  maxFractionDigits={field.value && unidade === "KG" ? 3 : 0}
                  placeholder="Quantidade"
                  className="w-full border rounded"
                  invalid={!!errors.quantidade}
                />
              )}
            />
            {errors.quantidade && <span className="text-red-500">{errors.quantidade.message}</span>}

            <Controller
              name="ean"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2">
                  <InputText {...field} type="number" mode="decimal" placeholder="EAN" className="w-full border rounded" invalid={!!errors.ean} />
                  <Button className="w-fit" severity="secondary" type="button" label="Gerar" onClick={handleGenerateEAN} />
                </div>
              )}
            />
            {errors.ean && <span className="text-red-500">{errors.ean.message}</span>}
          </div>
        </div>

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
