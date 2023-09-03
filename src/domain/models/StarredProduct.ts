import { z } from 'zod';

export const StarredProductSchema = z.object({
  id: z.string(),
  userEmail: z.string()
});

export type StarredProduct = z.infer<typeof StarredProductSchema>;
