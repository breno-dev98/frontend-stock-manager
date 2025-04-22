import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function BaseModal({
  visible,
  onHide,
  onSave,
  header = "Adicionar Item",
  children, // O conteúdo será passado como children
}) {
  const footer = (
    <div className="flex justify-end gap-2 flex-wrap">
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={onHide} />
      <Button label="Salvar" icon="pi pi-check" onClick={onSave} autoFocus />
    </div>
  );

  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={onHide}
      footer={footer}
      modal
      className="p-fluid sm:w-[65vw] md:w-[65vw] lg:w-[30vw] max-w-[95vw]"
      contentClassName="!overflow-visible"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          onSave();
        }}
      >
        <div className="mt-4">
          {/* Renderiza os children (inputs) passados para o modal */}
          {children}
        </div>
      </form>
    </Dialog>
  );
}
