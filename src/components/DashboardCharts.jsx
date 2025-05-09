import { Chart } from "primereact/chart";

const DashboardChart = ({ title, type = "bar", data, options }) => {
  return (
    <div className="p-4 border border-gray-300  rounded-xl shadow-md bg-white w-full md:w-[45%]">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 border border-gray-300">{title}</h3>
      <Chart type={type} data={data} options={options} style={{ width: "100%" }} />
    </div>
  );
};

export default DashboardChart;
