import { z } from 'zod';
import { ProductSchema } from './Product';

export const CartProductSchema = ProductSchema.merge(
  z.object({
    quantity: z.number().min(0),
  })
);

export const CartSchema = z.array(CartProductSchema);

export type CartProduct = z.infer<typeof CartSchema>;
export type Cart = z.infer<typeof CartSchema>;
