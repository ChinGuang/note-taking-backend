import { z } from 'zod';
import { GrammarCheckZod } from './base.js';

export const GrammarCheckResponseZod = z.object({
  message: z.string(),
  hasError: z.boolean(),
  details: z.array(GrammarCheckZod),
});

export type GrammarCheckResponse = z.infer<typeof GrammarCheckResponseZod>;
