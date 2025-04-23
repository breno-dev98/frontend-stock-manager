export const actionsButtons = (rowData, {onEdit,  onDelete}) => {
  return (
    <div className="flex gap-3">
      <i title="Editar" className="pi pi-pencil text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => (onEdit(rowData))}></i>
      <i title="Deletar" className="pi pi-trash text-red-400 hover:text-red-600 cursor-pointer" onClick={() => (onDelete(rowData))}></i>
    </div>
  );
};
