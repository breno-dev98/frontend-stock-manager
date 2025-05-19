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
import { useForm } from "react-hook-form";
import { MarcaService } from "../../services/marcasService";
import { CategoriaService } from "../../services/categoriasService";
import { FornecedorService } from "../../services/fornecedoresService";
import { gerarEAN } from "../../utils/gerarEAN";

import FormProdutos from "../../components/forms/FormProduto";

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
      estoque_minimo: 0,
      estoque_maximo: 0,
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
      estoque_minimo: Number(produto.estoque_minimo),
      estoque_maximo: Number(produto.estoque_maximo),
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
    {
      field: "categoria",
      header: "Categoria",
      body: (rowData) => categorias.find((c) => c.id === rowData.categoria_id)?.nome || "-",
    },
    {
      field: "marca",
      header: "Marca",
      body: (rowData) => marcas.find((c) => c.id === rowData.marca_id)?.nome || "-",
    },
    {
      field: "quantidade",
      header: "Estoque Atual",
      body: (rowData) => {
        const unidade = rowData.unidade_medida;
        const quantidade = Number(rowData.quantidade);

        if (isNaN(quantidade)) return "-";

        // Formata com base na unidade
        const casasDecimais = unidade === "KG" ? 3 : 0;

        return quantidade.toFixed(casasDecimais);
      },
    },
    { field: "unidade_medida", header: "Un. Medida" },
    { field: "estoque_minimo", header: "Estoque mínimo", body: (rowData) => rowData.estoque_minimo },
    { field: "estoque_maximo", header: "Estoque máximo", body: (rowData) => rowData.estoque_maximo },
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

        <FormProdutos
          control={control}
          errors={errors}
          categorias={categorias}
          marcas={marcas}
          fornecedores={fornecedores}
          unidades={unidades}
          unidade={unidade}
          modalVisible={modalVisible}
          Markup={Markup}
          handleGenerateEAN={handleGenerateEAN}
        />
      </BaseModal>

      <Toast ref={toastRef} />
      <ConfirmDialog />
    </PagesLayout>
  );
};

export default ProdutosPage;
