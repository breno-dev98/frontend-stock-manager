export function formatarCNPJ(cnpj) {
  if (!cnpj) return "";
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

export function formatarTelefone(telefone) {
  if (!telefone) return "";
  return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

export function formatarMoeda(value) {
  const numero = Number(value);

  if (isNaN(numero)) return "R$ 0,00"; // fallback

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


