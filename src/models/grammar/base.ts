import z from 'zod';

export const GrammarCheckZod = z.object({
  start: z.number().int().nonnegative(),
  end: z.number().int().nonnegative(),
  message: z.string(),
  suggestions: z.array(
    z.object({
      replacement: z.string(),
      message: z.string(),
    }),
  ),
});

export type GrammarCheckType = z.infer<typeof GrammarCheckZod>;
