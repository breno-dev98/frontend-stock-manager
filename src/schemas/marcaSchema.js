// src/validations/marca.schema.js
import { z } from "zod";

export const marcaSchema = z.object({
    nome: z.string({
        required_error: "O campo nome é obrigatório",
        invalid_type_error: "O campo nome deve ser um texto",
    }).min(1, "Nome é obrigatório").trim()
});
