const DashboardCards = ({ totalProdutos, totalEstoqueCritico, totalFornecedores, totalTransacoes }) => {
  const cards = [
    {
      titulo: "Total de Produtos",
      valor: totalProdutos,
      icone: "bi-box",
      corTexto: "text-blue-400",
      corFundo: "bg-blue-50",
    },
    {
      titulo: "Estoque Crítico",
      valor: totalEstoqueCritico || "0",
      icone: "bi-exclamation-triangle",
      corTexto: "text-red-400",
      corFundo: "bg-red-50",
    },
    {
      titulo: "Fornecedores",
      valor: totalFornecedores,
      icone: "bi-truck",
      corTexto: "text-yellow-400",
      corFundo: "bg-yellow-50",
    },
    {
      titulo: "Transações",
      valor: totalTransacoes,
      icone: "bi-arrow-left-right",
      corTexto: "text-green-400",
      corFundo: "bg-green-50",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div key={index} className="py-8 px-6 rounded-2xl bg-white col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 shadow-lg">
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${card.corFundo}`}>
              <i className={`bi ${card.icone} ${card.corTexto} text-3xl`}></i>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-500">{card.titulo}</h4>
              <span className="font-extrabold text-2xl text-gray-900">{card.valor}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DashboardCards;
