const PagesLayout = ({ children, title = "TÍTULO DA PÁGINA" }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-5xl text-gray-600 mb-4">{title}</h1>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PagesLayout;
