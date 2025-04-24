import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { createRef } from "react";
export const toastRef = createRef();

export const actionsButtons = (rowData, { onEdit, onDelete }) => {
  const confirmDelete = () => {
    confirmDialog({
      message: "Tem certeza que deseja excluir este item?",
      header: "Confirmação de Exclusão",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      accept: () => onDelete(rowData),
      reject: () => {
        toastRef.current?.show({
          severity: "info",
          summary: "Cancelado",
          detail: "Ação de exclusão cancelada",
          life: 3000,
        });
      },
    });
  };

  return (
    <div className="flex gap-3">
      <i title="Editar" className="pi pi-pencil text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => onEdit(rowData)}></i>
      <i title="Deletar" className="pi pi-trash text-red-400 hover:text-red-600 cursor-pointer" onClick={confirmDelete}></i>
    </div>
  );
};
