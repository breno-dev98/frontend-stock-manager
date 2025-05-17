import { Chart } from "primereact/chart";
import DashboardCards from "../../components/DashboardCards";
import DashboardChart from "../../components/DashboardCharts";
import PagesLayout from "../../components/Layout/PagesLayout";
import { useEffect, useState } from "react";
import { CategoriaService } from "../../services/categoriasService";
import { ProdutoService } from "../../services/produtoService";
import { FornecedorService } from "../../services/fornecedoresService";
import { EntradaService } from "../../services/entradaService";

const DashboardPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [entradas, setEntradas] = useState([]);
  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await CategoriaService.getAll();
      setCategorias(data.categorys);
    };

    const fetchProdutos = async () => {
      const data = await ProdutoService.getAll();
      setProdutos(data.produtos);
    };

    const fetchFornecedores = async () => {
      const data = await FornecedorService.getAll();
      setFornecedores(data.fornecedores);
    };

    const fetchEntradas = async () => {
      const data = await EntradaService.getAll();
      setEntradas(data.entradas);
    };
    fetchEntradas();
    fetchFornecedores();
    fetchProdutos();
    fetchCategorias();
  }, []);

  // 1. Cria um objeto onde a chave será o ID da categoria e o valor será a contagem de produtos
  const contagemPorCategoria = produtos.reduce((acc, produto) => {
    const id = produto.categoria_id;

    // Se já existe essa categoria no acumulador, incrementa
    if (acc[id]) {
      acc[id]++;
    } else {
      // Se não existe, inicia com 1
      acc[id] = 1;
    }

    return acc;
  }, {});

  const gerarMesesAteAtual = () => {
    const mesAtual = new Date().getMonth(); // 0 = Janeiro, 4 = Maio...
    const meses = Array.from({ length: mesAtual + 1 }, (_, i) => new Date(0, i).toLocaleString("pt-BR", { month: "short" }));

    return meses;
  };

  const mesesDoAno = gerarMesesAteAtual();

  const nomesCategorias = categorias.map((c) => c.nome);
  const dadosCategorias = categorias.map((c) => contagemPorCategoria[c.id] || 0);

  const doughnutData = {
    labels: nomesCategorias,
    datasets: [
      {
        data: dadosCategorias,
        backgroundColor: ["blue", "green", "yellow", "red", "gray"],
      },
    ],
  };

  const lineData = {
    labels: mesesDoAno,
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <PagesLayout title="Dashboard">
      <div>
        <DashboardCards totalProdutos={produtos.length} totalFornecedores={fornecedores.length} totalTransacoes={entradas.length} />
        <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Gráfico de Linha */}
          <div className="col-span-1 md:col-span-3 flex flex-col w-full border my-5 border-gray-300 rounded-xl shadow-md bg-white min-h-[400px]">
            <h2 className="text-lg lg:text-2xl font-medium py-2 pl-5 border-b text-gray-700 bg-gray-100 border-gray-300">Movimentação de Estoque</h2>
            <div className="flex-1 flex">
              <div className="w-full h-full px-4 pb-4">
                <Chart
                  type="line"
                  className="h-full"
                  data={lineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Gráfico Doughnut */}
          <div className="col-span-1 md:col-span-2 flex flex-col w-full border my-5 border-gray-300 rounded-xl shadow-md bg-white min-h-[400px]">
            <h2 className="text-lg lg:text-2xl font-medium py-2 pl-5 border-b text-gray-700 bg-gray-100 border-gray-300">
              Distribuição por Categoria
            </h2>
            <div className="flex-1 flex">
              <div className="w-full h-full px-4 pb-4">
                <Chart
                  type="doughnut"
                  className="h-full"
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PagesLayout>
  );
};

export default DashboardPage;
