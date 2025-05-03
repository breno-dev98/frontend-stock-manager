// src/validations/usuario.schema.js
import { z } from "zod";

export const usuarioSchema = z.object({
    nome: z.string({
        required_error: "O campo nome é obrigatório",
        invalid_type_error: "O campo nome deve ser um texto",
    }).min(1, "Nome é obrigatório").trim(),
    email: z.string({
        required_error: "O campo email é obrigatório",
        invalid_type_error: "O campo email deve ser um texto",
    }).email("E-mail inválido").trim(),
    senha: z.string({
        required_error: "O campo senha é obrigatório",
        invalid_type_error: "O campo senha deve ser um texto",
    }).min(6, "A senha deve ter pelo menos 6 caracteres").trim(),
    papel: z.string({
        required_error: "O campo papel é obrigatório",
        invalid_type_error: "O campo papel deve ser uma string"
    }).trim()
});
