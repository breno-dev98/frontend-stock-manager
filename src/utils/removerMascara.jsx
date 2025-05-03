export const removeMascara = (valor) => {
  if (!valor) return null; // Se for null ou vazio, retorna como está
  return valor.replace(/\D/g, ""); // Remove tudo que não for dígito
};

export function removeMascaraNumerica(valor) {
  return valor.replace(/[^\d.-]+/g, ""); // mantém números, ponto e traço
}
