// src/hooks/useToastMessage.js
import { useRef } from "react";

export const useToastMessage = () => {
  const toastRef = useRef(null);

  const showSuccess = (detail = "Ação realizada com sucesso!", summary = "Sucesso") => {
    toastRef.current?.show({
      severity: "success",
      summary,
      detail,
      life: 3000,
    });
  };

  const showError = (detail = "Algo deu errado!", summary = "Erro") => {
    toastRef.current?.show({
      severity: "error",
      summary,
      detail,
      life: 3000,
    });
  };

  const showInfo = (detail, summary = "Info") => {
    toastRef.current?.show({
      severity: "info",
      summary,
      detail,
      life: 3000,
    });
  };

  const showWarn = (detail, summary = "Atenção") => {
    toastRef.current?.show({
      severity: "warn",
      summary,
      detail,
      life: 3000,
    });
  };

  return {
    toastRef,
    showSuccess,
    showError,
    showInfo,
    showWarn,
  };
};
