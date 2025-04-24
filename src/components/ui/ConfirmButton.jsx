import React, { useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

export default function ConfirmButton({
  icon,
  label,
  message,
  header,
  onConfirm,
  severity = "info",
}) {
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({ severity: "info", summary: "Confirmado", detail: "Ação confirmada", life: 3000 });
    if (onConfirm) onConfirm();
  };

  const reject = () => {
    toast.current.show({ severity: "warn", summary: "Cancelado", detail: "Ação cancelada", life: 3000 });
  };

  const showDialog = () => {
    confirmDialog({
      message,
      header,
      icon: severity === "danger" ? "pi pi-info-circle" : "pi pi-exclamation-triangle",
      defaultFocus: severity === "danger" ? "reject" : "accept",
      acceptClassName: severity === "danger" ? "p-button-danger" : "",
      accept,
      reject,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Button onClick={showDialog} icon={icon} label={label} className="mr-2" />
    </>
  );
}
