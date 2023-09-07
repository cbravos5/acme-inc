import { z } from 'zod';

export const UserSchema = z.object({
  name: z
    .string()
    .nonempty('Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z
    .string()
    .nonempty('E-mail é obrigatório')
    .email('Não é um email válido')
    .max(100, 'E-mail deve ter no máximo 100 caracteres'),
  phone: z
    .string()
    .nonempty('Telefone é obrigatório')
    .length(11, 'Não é um telefone válido'),
  password: z.string().nonempty('Senha é obrigatório'),
});

export type User = z.infer<typeof UserSchema>;
