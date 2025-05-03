import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Email é obrigatório")
        .email("Formato de email inválido").trim(),
    senha: z
        .string()
        .nonempty("Senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres").trim(),
});
