const PagesLayout = ({ children, title = "TÍTULO DA PÁGINA" }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="md:text-5xl sm:text-3xl text-2xl text-gray-600 mb-4">{title}</h1>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PagesLayout;
