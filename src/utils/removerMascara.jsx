export const removeMascara = (valor) => {
  if (!valor) return null; // Se for null ou vazio, retorna como está
  return valor.replace(/\D/g, ""); // Remove tudo que não for dígito
};
