import { z } from "zod";

export const produtoSchema = z.object({
    nome: z
        .string()
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(255, "O nome deve ter no máximo 255 caracteres"),

    descricao: z
        .string()
        .max(500, "A descrição deve ter no máximo 500 caracteres")
        .optional()
        .or(z.literal("")),

    preco_custo: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "O preço de custo deve ser um número positivo",
        }),

    preco_venda: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "O preço de venda deve ser um número positivo",
        }),

    quantidade: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "A quantidade deve ser um número positivo",
        }),

    unidade_medida: z.enum(["UNIDADE", "KG", "LITRO", "CX", "PC"], {
        errorMap: () => ({ message: "Unidade de medida inválida" }),
    }),

    marca_id: z.string().uuid().nullable().or(z.literal("")).optional(),
    categoria_id: z.string().uuid().nullable().or(z.literal("")).optional(),
    fornecedor_id: z.string().uuid().nullable().or(z.literal("")).optional(),

    user_id: z.string().uuid({ message: "ID do usuário é obrigatório" }),
})
    .refine((data) => {
        if (Number(data.preco_venda) < Number(data.preco_custo)) {
            return false;
        }
        return true;
    }, {
        message: "O preço de venda deve ser maior que o preço de custo",
        path: ["preco_venda"],
    })
    .refine((data) => {
        const unidadesInteiras = ["UNIDADE", "PC", "CX"];
        const isDecimal = !Number.isInteger(Number(data.quantidade));
        if (unidadesInteiras.includes(data.unidade_medida) && isDecimal) {
            return false;
        }
        return true;
    }, {
        message: "A unidade selecionada não permite valor com casas decimais",
        path: ["quantidade"],
    });
