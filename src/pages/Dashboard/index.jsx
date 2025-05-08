import PagesLayout from "../../components/Layout/PagesLayout";

const DashboardPage = () => {
    const cards = [
    {icon: 'pi pi-box', colorIcon: 'blue', colorBgIcon: 'blue'},
    {icon: 'pi pi-box', colorIcon: 'blue', colorBgIcon: 'blue'},
]
  return (
    <PagesLayout title="Dashboard">
      <div>
        <div
          className="w-fit py-3 pl-4 pr-10 rounded-lg"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
                  <div className="flex items-center gap-3">
                      {cards.map(c => (
                          
            <i className={`${c.icon} text-${c.colorIcon}-400 bg-${c.colorBgIcon}-50`} style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
                      ))}
            <div>
              <h4 className="text-md font-medium text-gray-400">Total de Produtos</h4>
              <span className="font-bold text-lg text-black">120</span>
            </div>
          </div>
        </div>
      </div>
    </PagesLayout>
  );
};

export default DashboardPage;
