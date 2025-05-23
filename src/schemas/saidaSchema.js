import { z } from "zod";

export const saidaSchema = z.object({
    produto_id: z
        .string({ required_error: "O produto é obrigatório" })
        .uuid("ID de produto inválido"),

    quantidade: z
        .number()
        .refine((val) => parseFloat(val) > 0, {
            message: "A quantidade deve ser maior que zero",
        }),

    data_saida: z
        .string({ required_error: "A data de saída é obrigatória" })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "A data de saída deve ser uma data válida",
        }),

    preco_unitario: z
        .number()
        .refine((val) => parseFloat(val) >= 0, {
            message: "O preço unitário não pode ser negativo",
        }),

    // Se quiser algum campo opcional, tipo fornecedor_id na entrada, pode adicionar aqui também.
});
