import { z } from "zod";

export const entradaSchema = z.object({
    produto_id: z
        .string({ required_error: "O produto é obrigatório" })
        .uuid("ID de produto inválido"),

    quantidade: z
        .number()
        .refine((val) => parseFloat(val) > 0, {
            message: "A quantidade deve ser maior que zero",
        }),

    data_entrada: z
        .string({ required_error: "A data de entrada é obrigatória" })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "A data de entrada deve ser uma data válida",
        }),

    preco_compra: z
        .number()
        .refine((val) => parseFloat(val) >= 0, {
            message: "O preço de compra não pode ser negativo",
        }),

    fornecedor_id: z
        .string()
        .uuid("ID de fornecedor inválido")
        .optional()
        .or(z.literal("")),

});
