import { z } from 'zod';

export const GrammarCheckRequestZod = z.object({
  text: z.string(),
});

export type GrammarCheckRequest = z.infer<typeof GrammarCheckRequestZod>;
