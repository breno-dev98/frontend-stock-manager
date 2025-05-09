const DashboardCards = () => {
    return (
      <section className="flex flex-wrap gap-5">
        {/* Card Total Produtos */}
        <div
          className="w-max flex-1 py-6 pl-6 pr-12 rounded-lg"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="pi pi-box text-blue-400 bg-blue-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Total de Produtos</h4>
              <span className="font-bold text-lg text-black">120</span>
            </div>
          </div>
        </div>
        {/* Card Estoque Crítico */}
        <div
          className="w-max flex-1 py-6 pl-6 pr-12 rounded-lg"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="pi pi-exclamation-triangle text-red-400 bg-red-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Estoque Crítico</h4>
              <span className="font-bold text-lg text-black">12</span>
            </div>
          </div>
        </div>
        {/* Card Fornecedores */}
        <div
          className="w-max flex-1 py-6 pl-6 pr-12 rounded-lg"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="bi bi-truck text-yellow-400 bg-yellow-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Fornecedores</h4>
              <span className="font-bold text-lg text-black">38</span>
            </div>
          </div>
        </div>
        {/* Card Transações */}
        <div
          className="w-max flex-1 py-6 pl-6 pr-12 rounded-lg"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="pi pi-arrow-right-arrow-left text-green-400 bg-green-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Transações</h4>
              <span className="font-bold text-lg text-black">24</span>
            </div>
          </div>
        </div>
      </section>
    );
}
 
export default DashboardCards;