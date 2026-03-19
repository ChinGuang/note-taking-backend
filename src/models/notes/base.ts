import { z } from 'zod';

export const NoteZod = z.object({
  title: z.string(),
  content: z.string(),
});

export type Note = z.infer<typeof NoteZod>;
