import React, { useState, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { label: "Dashboard", icon: "pi pi-gauge", path: "/dashboard", id: "dashboard_nav" },
    { label: "Produtos", icon: "pi pi-box", path: "/produtos", id: "produtos_nav" },
    { label: "Marcas", icon: "pi pi-tag", path: "/marcas", id: "marcas_nav" },
    { label: "Categorias", icon: "pi pi-th-large", path: "/categorias", id: "categorias_nav" },
    { label: "Fornecedores", icon: "pi pi-truck", path: "/fornecedores", id: "fornecedores_nav" },
    { label: "Usuários", icon: "pi pi-users", path: "/usuarios", id: "usuarios_nav" },
    { label: "Entrada", icon: "pi pi-arrow-circle-up", path: "/entradas", id: "entradas_nav" },
    { label: "Saída", icon: "pi pi-arrow-circle-down", path: "/saidas", id: "saidas_nav" },
    { label: "Unidades", icon: "bi bi-rulers", path: "/unidades", id: "unidades_nav" },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header fixo */}
      <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow z-10">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Button icon="pi pi-bars" className="p-button-text p-button-sm focus:ring-0" onClick={() => setMobileMenuOpen(true)} />
          </div>
          <h1 className="text-xl font-bold">Stock Manager</h1>
        </div>
        <div className="flex gap-4 items-center">
          <h1 className="text-xl hidden sm:block">Olá, Administrador</h1>
          <Avatar icon="pi pi-user" shape="circle" />
          <i title="Logout" className="pi pi-sign-out cursor-pointer" onClick={logout}></i>
        </div>
      </header>

      {/* Sidebar - Telas médias e maiores */}
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`
            bg-white border-r border-gray-200 transition-all duration-300 ease-in-out 
            ${collapsed ? "w-16" : "w-60"} 
            hidden md:flex flex-col
          `}
        >
          <div className="flex items-center justify-between mt-2">
            {!collapsed && <i className="text-2xl ml-2 font-bold bi bi-box-seam"></i>}
            <Button
              icon={collapsed ? "pi pi-angle-right" : "pi pi-angle-left"}
              className="p-button-text p-button-sm focus:ring-0"
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>

          <Divider />

          <nav className="flex flex-col gap-2 px-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                id={item.id}
                title={item.label}
                className={`flex items-center cursor-pointer p-3 rounded-md hover:bg-gray-100 transition-colors ${
                  location.pathname === item.path ? "bg-gray-200" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <i className={`${item.icon} text-xl`} />
                {!collapsed && <span className="ml-3 text-base font-medium">{item.label}</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Mobile - Drawer */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-60 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-3 flex items-center justify-between border-b">
            <i className="text-2xl ml-2 font-bold bi bi-box-seam"></i>
            <Button icon="pi pi-times" className="p-button-text p-button-sm focus:ring-0" onClick={() => setMobileMenuOpen(false)} />
          </div>

          <Divider className="my-2" />

          <nav className="flex flex-col gap-2 px-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                id={item.id}
                className={`flex items-center cursor-pointer p-3 rounded-md hover:bg-gray-100 transition-colors ${
                  location.pathname === item.path ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                <i title={item.label} className={`${item.icon} text-xl`} />
                <span className="ml-3 text-base font-medium">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
