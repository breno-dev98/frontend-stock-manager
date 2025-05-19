import { z } from "zod";

export const produtoSchema = z.object({
    nome: z
        .string()
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .max(255, "O nome deve ter no máximo 255 caracteres"),

    descricao: z
        .string()
        .max(500, "A descrição deve ter no máximo 500 caracteres")
        .nullable()
        .optional()
        .or(z.literal("")),

    preco_custo: z
        .number({
            required_error: "O preço de custo é obrigatório",
            invalid_type_error: "O preço de custo deve ser um número",
        })
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "O preço de custo deve ser um número positivo",
        }),

    preco_venda: z
        .number({
            required_error: "O preço de venda é obrigatório",
            invalid_type_error: "O preço de venda deve ser um número",
        })
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "O preço de venda deve ser um número positivo",
        }),
    ean: z.number().optional(),
    quantidade: z
        .number()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "A quantidade deve ser um número positivo",
        }),
    estoque_minimo: z
        .number({
            required_error: "O estoque mínimo é obrigatório",
            invalid_type_error: "O estoque mínimo deve ser um número",
        })
        .refine((val) => val >= 0, {
            message: "O estoque mínimo deve ser um número positivo",
        }),

    estoque_maximo: z
        .number({
            required_error: "O estoque máximo é obrigatório",
            invalid_type_error: "O estoque máximo deve ser um número",
        })
        .refine((val) => val >= 0, {
            message: "O estoque máximo deve ser um número positivo",
        }),

    unidade_medida: z.enum(["UNIDADE", "KG", "LITRO", "CX", "PC"], {
        errorMap: () => ({ message: "Unidade de medida inválida" }),
    }),

    marca_id: z.string().uuid().nullable().or(z.literal("")).optional(),
    categoria_id: z.string().uuid().nullable().or(z.literal("")).optional(),
    fornecedor_id: z.string().uuid().nullable().or(z.literal("")).optional(),
})
    .refine((data) => {
        const unidadesInteiras = ["UNIDADE", "PC", "CX"];
        const isDecimal = !Number.isInteger(Number(data.quantidade));

        if (unidadesInteiras.includes(data.unidade_medida) && isDecimal) {
            return false;
        }

        if (data.unidade_medida === "KG") {
            const partes = String(data.quantidade).split(".");
            if (partes[1] && partes[1].length > 3) {
                return false;
            }
        }

        return true;
    }, {
        message: "A quantidade informada é inválida para a unidade selecionada",
        path: ["quantidade"],
    })
