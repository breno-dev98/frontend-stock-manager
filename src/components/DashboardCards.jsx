const DashboardCards = ({totalProdutos, totalEstoqueCritico, totalFornecedores, totalTransacoes}) => {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {/* Card Total Produtos */}
        <div
          className="py-6 pl-6 pr-12 rounded-lg bg-white col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="pi pi-box text-blue-400 bg-blue-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Total de Produtos</h4>
              <span className="font-bold text-lg text-black">{totalProdutos}</span>
            </div>
          </div>
        </div>

        {/* Card Estoque Crítico */}
        <div
          className="py-6 pl-6 pr-12 rounded-lg bg-white col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="pi pi-exclamation-triangle text-red-400 bg-red-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Estoque Crítico</h4>
              <span className="font-bold text-lg text-black">{totalEstoqueCritico || "0"}</span>
            </div>
          </div>
        </div>

        {/* Card Fornecedores */}
        <div
          className="py-6 pl-6 pr-12 rounded-lg bg-white col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="bi bi-truck text-yellow-400 bg-yellow-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Fornecedores</h4>
              <span className="font-bold text-lg text-black">{totalFornecedores}</span>
            </div>
          </div>
        </div>

        {/* Card Transações */}
        <div
          className="py-6 pl-6 pr-12 rounded-lg bg-white col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <i className="pi pi-arrow-right-arrow-left text-green-400 bg-green-50" style={{ fontSize: "1.7rem", padding: 10, borderRadius: 50 }}></i>
            <div>
              <h4 className="text-md font-medium text-gray-400">Transações</h4>
              <span className="font-bold text-lg text-black">{totalTransacoes}</span>
            </div>
          </div>
        </div>
      </section>
    );
}
 
export default DashboardCards;