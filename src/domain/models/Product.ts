import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .nonempty({ message: 'Nome é obrigatório' })
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .nonempty({ message: 'Descrição é obrigatório' })
    .min(20, 'Descrição deve ter no mínimo 20 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  price: z.number().nonnegative('Preço deve ser pelo menos zero'),
  image: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
