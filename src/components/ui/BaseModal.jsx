import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function BaseModal({
  visible,
  onHide,
  onSubmit,
  header = "Adicionar Item",
  children, // O conteúdo será passado como children
}) {
  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={onHide}
      modal
      className="p-fluid sm:w-[65vw] md:w-[65vw] lg:w-[30vw] max-w-[95vw]"
      contentClassName="!overflow-visible border-y border-y-gray-300"
    >
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          {/* Renderiza os children (inputs) passados para o modal */}
          {children}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button label="Cancelar" icon="pi pi-times" type="button" className="p-button-text w-auto min-w-[100px]" onClick={onHide} />
          <Button label="Salvar" icon="pi pi-check" className="w-auto min-w-[100px]" type="submit" autoFocus />
        </div>
      </form>
    </Dialog>
  );
}
