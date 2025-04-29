// src/validations/fornecedor.schema.js
import { z } from "zod";

export const fornecedorSchema = z.object({
    nome: z.string({
        required_error: "O campo nome é obrigatório",
        invalid_type_error: "O campo nome deve ser um texto",
    }).min(1, "Nome é obrigatório"),

    cnpj: z.string({
        required_error: "O campo CNPJ é obrigatório",
        invalid_type_error: "O campo CNPJ deve ser apenas números",
    }).min(14, "CNPJ deve ter no mínimo 14 caracteres").max(14, "CNPJ inválido"),


    telefone: z.string({
        required_error: "O campo telefone é obrigatório",
        invalid_type_error: "O campo telefone deve ser apenas números",
    }).min(11, "Telefone deve ter no mínimo 11 dígitos"),


    email: z.string({
        required_error: "O campo e-mail é obrigatório",
        invalid_type_error: "O campo e-mail deve ser um texto",
    }).email("Formato de e-mail inválido"),
});
