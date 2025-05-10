import { Chart } from "primereact/chart";
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


  const doughnutData = {
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
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col col-span-3 w-full border my-5 border-gray-300 rounded-xl shadow-md bg-white">
            <h2 className="text-2xl font-medium py-2 pl-5 border-b text-gray-700 bg-gray-100 border-gray-300">Movimentação de Estoque</h2>
            <Chart type="line" data={lineData} />
          </div>
          <div className="flex flex-col col-span-1 w-full h-fit border my-5 border-gray-300 rounded-xl shadow-md bg-white">
            <h2 className="text-2xl font-medium py-2 pl-5 border-b text-gray-700 bg-gray-100 border-gray-300">Distribuição por Categoria</h2>
            <Chart type="doughnut" data={doughnutData} />
          </div>
        </section>
      </div>
    </PagesLayout>
  );
};

export default DashboardPage;
