import { Chart } from "primereact/chart";

const DashboardChart = ({ title, type = "bar", data, options, classNameDiv, style }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-xl shadow-md bg-white ${classNameDiv}`}>
      <h3 className="text-2xl font-medium py-2 pl-5 border-b text-gray-700 bg-gray-100 border-gray-300">{title}</h3>
      <div className="flex-1 p-4">
        <Chart type={type} data={data} options={options} style={style} />
      </div>
    </div>
  );
};

export default DashboardChart;
