import DashboardCards from "../../components/DashboardCards";
import DashboardChart from "../../components/DashboardCharts";
import PagesLayout from "../../components/Layout/PagesLayout";

const DashboardPage = () => {
  const gerarMesesAteAtual = () => {
    const mesAtual = new Date().getMonth(); // 0 = Janeiro, 4 = Maio...
    const meses = Array.from({ length: mesAtual + 1 }, (_, i) => new Date(0, i).toLocaleString("pt-BR", { month: "short" }));

    return meses;
  };

  const mesesDoAno = gerarMesesAteAtual();


  const pieData = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
        <DashboardCards />
        <DashboardChart title="Distribuição de Categorias" type="pie" data={pieData} />
        <DashboardChart title="Movimentação de Estoque" type="line" data={lineData} />
      </div>
    </PagesLayout>
  );
};

export default DashboardPage;
