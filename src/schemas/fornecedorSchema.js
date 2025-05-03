// src/validations/fornecedor.schema.js
import { z } from "zod";
import { removeMascara } from "../utils/removerMascara";


export const fornecedorSchema = z.object({
    nome: z.string({
        required_error: "O campo nome é obrigatório",
        invalid_type_error: "O campo nome deve ser um texto",
    }).min(1, "Nome é obrigatório").trim(),

    cnpj: z.string({
        required_error: "O campo CNPJ é obrigatório",
        invalid_type_error: "O campo CNPJ deve ser apenas números",
    }).transform(removeMascara).refine((val) => val.length === 14, { message: "CNPJ deve ter exatamente 14 dígitos" }),


    telefone: z.string({
        required_error: "O campo telefone é obrigatório",
        invalid_type_error: "O campo telefone deve ser apenas números",
    }).transform(removeMascara).refine((val) => val.length === 11, { message: "Telefone deve ter exatamente 11 dígitos" }),


    email: z.string({
        required_error: "O campo e-mail é obrigatório",
        invalid_type_error: "O campo e-mail deve ser um texto",
    }).email("Formato de e-mail inválido").trim(),
});
