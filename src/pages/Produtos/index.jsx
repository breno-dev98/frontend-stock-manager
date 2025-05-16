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
import { gerarEAN } from "../../utils/gerarEAN";
import { FloatLabel } from "primereact/floatlabel";

const ProdutosPage = () => {
  const { toastRef, showSuccess, showError } = useToastMessage();
  const [produtos, setProdutos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtro, setFiltro] = useState("");
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
    defaultValues: {
      nome: "",
      descricao: "",
      ean: "",
      preco_custo: "",
      preco_venda: "",
      quantidade: 0,
      unidade_medida: "",
      marca_id: "",
      categoria_id: "",
      fornecedor_id: "",
    },
  });

  const unidade = watch("unidade_medida");
  const custo = watch("preco_custo")
  const venda = watch("preco_venda")
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
      ean: Number(produto.ean),
      preco_custo: Number(produto.preco_custo),
      preco_venda: Number(produto.preco_venda),
      quantidade: Number(produto.quantidade),
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
    { field: "ean", header: "EAN", body: (rowData) => rowData.ean || "-" },
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
        const casasDecimais = unidade === "KG" ? 3 : 0;

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

  const produtosFiltrados = produtos.filter((produto) =>
    columns.some((col) => {
      const valor = produto[col.field];
      return valor?.toString().toLowerCase().includes(filtro.toLowerCase());
    })
  );

  const handleGenerateEAN = () => {
    const eangerado = gerarEAN();
    setValue("ean", eangerado);
  };

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

  const calcularMarkUp = () => {
    const custoNum = parseFloat(custo);
    const vendaNum = parseFloat(venda);

    if (!vendaNum || vendaNum === 0 || isNaN(custoNum) || isNaN(vendaNum)) {
      return 0;
    }

    const lucro = vendaNum - custoNum;
    const markup = custoNum > 0 ? (lucro / custo) * 100 : 0;

    return markup;
  };

  const Markup = calcularMarkUp().toFixed(2)

  return (
    <PagesLayout title="Gerenciamento de Produtos">
      <BaseTable
        data={produtosFiltrados}
        columns={columns}
        buttonLabel="Novo Produto"
        sortable
        sortMode="multiple"
        emptyMessage="Nenhum produto encontrado"
        headerTitle="Lista de Produtos"
        onClick={() => setModalVisible(true)}
        valueSearch={filtro}
        onChangeSearch={(e) => setFiltro(e.target.value)}
      />

      <BaseModal
        header={isEditing ? "Editar Produto" : "Adicionar Produto"}
        visible={modalVisible}
        onHide={handleCloseModal}
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Nome */}
          <div className="col-span-full">
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <InputText
                    {...field}
                    type="text"
                    id="nome"
                    autoFocus={modalVisible}
                    className="w-full border rounded px-2 py-1"
                    invalid={!!errors.nome}
                  />
                  <label htmlFor="nome">Nome</label>
                </FloatLabel>
              )}
            />
            {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
          </div>

          {/* Descrição */}
          <div className="col-span-full">
            <FloatLabel>
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <InputText {...field} type="text" id="descricao" className="w-full border rounded px-2 py-1" invalid={!!errors.descricao} />
                )}
              />
              <label htmlFor="descricao">Descrição (Opcional)</label>
            </FloatLabel>
            {errors.descricao && <span className="text-red-500">{errors.descricao.message}</span>}
          </div>

          {/* Preço de Custo */}
          <div>
            <FloatLabel>
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
                    id="preco_custo"
                    className="w-full rounded"
                    invalid={!!errors.preco_custo}
                  />
                )}
              />
              <label htmlFor="preco_custo">Preço de custo</label>
            </FloatLabel>
            {errors.preco_custo && <span className="text-red-500">{errors.preco_custo.message}</span>}
          </div>

          {/* Preço de Venda */}
          <div>
            <Controller
              name="preco_venda"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <InputNumber
                    value={field.value}
                    id="preco_venda"
                    onValueChange={(e) => field.onChange(e.value)}
                    locale="pt-br"
                    mode="currency"
                    currency="BRL"
                    className="w-full rounded"
                    invalid={!!errors.preco_venda}
                  />
                  <label htmlFor="preco_venda">Preço de venda</label>
                </FloatLabel>
              )}
            />
            {errors.preco_venda && <span className="text-red-500">{errors.preco_venda.message}</span>}
          </div>
          {/* Margem de lucro */}
          <div className="text-lg font-medium">
            Margem: <span className={`text-blue-600 ${Markup < 0 && "text-red-600"} ${Markup == 0 && "text-gray-400"} font-bold`}>{Markup}%</span>
          </div>

          {/* Quantidade */}
          <div>
            <Controller
              name="quantidade"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <InputNumber
                    value={field.value}
                    onValueChange={(e) => field.onChange(e.value)}
                    inputRef={field.ref}
                    mode="decimal"
                    useGrouping={false}
                    minFractionDigits={unidade === "KG" ? 3 : 0}
                    maxFractionDigits={unidade === "KG" ? 3 : 0}
                    id="quantidade"
                    className="w-full rounded"
                    invalid={!!errors.quantidade}
                  />
                  <label htmlFor="quantidade">Quantidade</label>
                </FloatLabel>
              )}
            />
            {errors.quantidade && <span className="text-red-500">{errors.quantidade.message}</span>}
          </div>

          {/* EAN + Botão */}
          <div className="flex gap-2 items-center">
            <Controller
              name="ean"
              control={control}
              render={({ field }) => (
                <>
                  <FloatLabel>
                    <InputNumber
                      id="ean"
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                      inputRef={field.ref}
                      useGrouping={false}
                      className="w-full rounded"
                      invalid={!!errors.ean}
                    />
                    <label htmlFor="ean">EAN</label>
                  </FloatLabel>
                  <Button
                    className="!w-[100px] flex flex-col"
                    size="small"
                    severity="secondary"
                    type="button"
                    icon={<i className="pi pi-barcode" style={{ fontSize: "10px" }}></i>}
                    label={<span className="text-xs">Gerar</span>}
                    onClick={handleGenerateEAN}
                    style={{ padding: "8px 0px" }}
                  />
                </>
              )}
            />
            {errors.ean && <span className="text-red-500">{errors.ean.message}</span>}
          </div>

          {/* Unidade de Medida */}
          <div>
            <Controller
              name="unidade_medida"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <Dropdown
                    {...field}
                    options={unidades}
                    optionLabel="nome"
                    optionValue="value"
                    id="unidade_de_medida"
                    className={`w-full border rounded ${errors.unidade_medida ? "border-red-500" : ""}`}
                  />
                  <label htmlFor="unidade_de_medida">Unidade de Medida</label>
                </FloatLabel>
              )}
            />
            {errors.unidade_medida && <span className="text-red-500">{errors.unidade_medida.message}</span>}
          </div>

          {/* Marca */}
          <div>
            <Controller
              name="marca_id"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <Dropdown
                    {...field}
                    options={marcas}
                    optionLabel="nome"
                    optionValue="id"
                    id="marca_id"
                    className={`w-full border rounded ${errors.marca_id ? "border-red-500" : ""}`}
                  />
                  <label htmlFor="marca_id">Marca</label>
                </FloatLabel>
              )}
            />
            {errors.marca_id && <span className="text-red-500">{errors.marca_id.message}</span>}
          </div>

          {/* Categoria */}
          <div>
            <Controller
              name="categoria_id"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <Dropdown
                    {...field}
                    options={categorias}
                    optionLabel="nome"
                    optionValue="id"
                    id="categoria_id"
                    className={`w-full border rounded ${errors.categoria_id ? "border-red-500" : ""}`}
                  />
                  <label htmlFor="categoria_id">Categoria (Opcional)</label>
                </FloatLabel>
              )}
            />
            {errors.categoria_id && <span className="text-red-500">{errors.categoria_id.message}</span>}
          </div>

          {/* Fornecedor */}
          <div>
            <Controller
              name="fornecedor_id"
              control={control}
              render={({ field }) => (
                <FloatLabel>
                  <Dropdown
                    {...field}
                    options={fornecedores}
                    optionLabel="nome"
                    optionValue="id"
                    id="fornecedor_id"
                    className={`w-full border rounded ${errors.fornecedor_id ? "border-red-500" : ""}`}
                  />
                  <label htmlFor="fornecedor_id">Fornecedor (Opcional)</label>
                </FloatLabel>
              )}
            />
            {errors.fornecedor_id && <span className="text-red-500">{errors.fornecedor_id.message}</span>}
          </div>
        </div>
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default ProdutosPage;
